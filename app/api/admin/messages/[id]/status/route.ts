import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Auth security check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== process.env.ADMIN_ALLOWED_EMAIL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { status } = await request.json()

    const { error } = await supabase
      .from("contact_messages")
      .update({ status })
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ message: "Message status updated successfully" })
  } catch (err: any) {
    console.error("Update message status API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}
