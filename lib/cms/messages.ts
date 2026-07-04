import { createClient } from "@/lib/supabase/server"

export interface DBMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  source: string
  created_at: string
}

export async function getMessages(status?: string): Promise<DBMessage[]> {
  const supabase = await createClient()
  let query = supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
  
  if (status && status !== "all") {
    query = query.eq("status", status)
  }

  const { data, error } = await query
  if (error) throw error
  return data as DBMessage[]
}

export async function getMessageById(id: string): Promise<DBMessage | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .eq("id", id)
    .single()
  
  if (error) {
    if (error.code === "PGRST116") return null
    throw error
  }
  return data as DBMessage
}

export async function updateMessageStatus(id: string, status: 'new' | 'read' | 'replied' | 'archived'): Promise<DBMessage> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("contact_messages")
    .update({ status })
    .eq("id", id)
    .select()
    .single()
  
  if (error) throw error
  return data as DBMessage
}

export async function deleteMessage(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", id)
  
  if (error) throw error
}
