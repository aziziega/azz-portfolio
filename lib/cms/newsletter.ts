import { createClient } from "@/lib/supabase/server"

export interface DBSubscriber {
  id: string
  email: string
  status: 'pending' | 'active' | 'unsubscribed' | 'bounced'
  source: string
  confirm_token?: string | null
  created_at: string
}

export async function getSubscribers(status?: string): Promise<DBSubscriber[]> {
  const supabase = await createClient()
  let query = supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false })
  
  if (status && status !== "all") {
    query = query.eq("status", status)
  }

  const { data, error } = await query
  if (error) throw error
  return data as DBSubscriber[]
}

export async function deleteSubscriber(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("newsletter_subscribers")
    .delete()
    .eq("id", id)
  
  if (error) throw error
}

export async function updateSubscriberStatus(id: string, status: 'active' | 'unsubscribed' | 'bounced'): Promise<DBSubscriber> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .update({ status })
    .eq("id", id)
    .select()
    .single()
  
  if (error) throw error
  return data as DBSubscriber
}
