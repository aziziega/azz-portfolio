import { createClient } from "@/lib/supabase/server"

export interface DBSiteSetting {
  key: string
  value: any
  updated_at: string
}

export async function getSettings(): Promise<Record<string, any>> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
  
  if (error) {
    // If table doesn't exist, fail gracefully or return empty
    return {}
  }

  const settings: Record<string, any> = {}
  data.forEach((item: DBSiteSetting) => {
    settings[item.key] = item.value
  })

  return settings
}

export async function getSettingByKey(key: string): Promise<any | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .single()
  
  if (error) {
    if (error.code === "PGRST116") return null
    throw error
  }
  return data.value
}

export async function updateSetting(key: string, value: any): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
  
  if (error) throw error
}
