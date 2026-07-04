import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export interface DBWriting {
  id: string
  external_id: string | null
  title: string
  excerpt: string | null
  platform: string
  url: string
  category: string | null
  published_date: string | null
  read_time: string | null
  featured: boolean
  sort_order: number
  status: 'draft' | 'published' | 'hidden'
  source: string
  created_at: string
  updated_at: string
}

export async function getWritings(status?: string): Promise<DBWriting[]> {
  const supabase = await createClient()
  let query = supabase
    .from("external_writings")
    .select("*")
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("published_date", { ascending: false })
  
  if (status && status !== "all") {
    query = query.eq("status", status)
  }

  const { data, error } = await query
  if (error) throw error
  return data as DBWriting[]
}

export async function toggleWritingVisibility(id: string, status: 'draft' | 'published' | 'hidden'): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("external_writings")
    .update({ status })
    .eq("id", id)
  
  if (error) throw error
}

export async function toggleWritingFeatured(id: string, featured: boolean): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("external_writings")
    .update({ featured })
    .eq("id", id)
  
  if (error) throw error
}

export async function deleteWriting(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("external_writings")
    .delete()
    .eq("id", id)
  
  if (error) throw error
}

// Service role sync from Medium (ignores RLS since it's an automated background sync)
export async function syncFromMedium(): Promise<{ synced: number; failed: number }> {
  try {
    const rssUrl = 'https://medium.com/feed/@aziziegatrimuthi16_89459'
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
    
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    if (!data.items || data.items.length === 0) {
      return { synced: 0, failed: 0 }
    }

    const adminSupabase = createAdminClient()
    let synced = 0
    let failed = 0

    for (const item of data.items) {
      try {
        let plainText = item.description.replace(/<[^>]+>/g, '').trim()
        plainText = plainText.replace(/Continue reading on Medium \u00bb/g, '').trim()
        const excerpt = plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText
        
        const wordCount = plainText.split(/\s+/).length
        const readTimeMins = Math.max(1, Math.ceil(wordCount / 200))
        
        const dateObj = new Date(item.pubDate)
        const formattedDate = dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })

        const writingItem = {
          external_id: item.guid || item.link,
          title: item.title,
          excerpt,
          platform: 'Medium',
          url: item.link,
          category: item.categories && item.categories.length > 0 ? item.categories[0] : 'Article',
          published_date: formattedDate,
          read_time: `${readTimeMins} min read`,
          status: 'published',
          source: 'medium_sync'
        }

        // Upsert into database
        const { error } = await adminSupabase
          .from("external_writings")
          .upsert(writingItem, { onConflict: 'url' })

        if (error) throw error
        synced++
      } catch (err) {
        console.error('Error syncing single article:', err)
        failed++
      }
    }

    return { synced, failed }
  } catch (error) {
    console.error('Error syncing from Medium RSS:', error)
    throw error
  }
}
