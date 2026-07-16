import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendReplyEmail } from "@/lib/email/resend"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // Auth security check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== process.env.ADMIN_ALLOWED_EMAIL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { 
      messageId, 
      to, 
      subject, 
      replyText, 
      originalName, 
      originalDate, 
      originalBody 
    } = await request.json()

    if (!messageId || !to || !subject || !replyText || !replyText.trim()) {
      return NextResponse.json({ message: "Missing required parameters." }, { status: 400 })
    }

    // Call Resend to send reply
    await sendReplyEmail(
      to, 
      subject, 
      replyText, 
      {
        name: originalName || "Pengunjung",
        date: originalDate || new Date().toLocaleString(),
        body: originalBody || ""
      }
    )

    // Update message status to 'replied' in contact_messages
    const { error: dbError } = await supabase
      .from("contact_messages")
      .update({ status: "replied" })
      .eq("id", messageId)

    if (dbError) throw dbError

    return NextResponse.json({ message: "Reply sent successfully and status updated!" })
  } catch (err: any) {
    console.error("Reply message API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}
