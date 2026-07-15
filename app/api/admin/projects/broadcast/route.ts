import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendBroadcastEmail } from "@/lib/email/resend"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // Auth security check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== process.env.ADMIN_ALLOWED_EMAIL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { subject, body } = await request.json()

    if (!subject || !subject.trim() || !body || !body.trim()) {
      return NextResponse.json({ message: "Subject and body are required." }, { status: 400 })
    }

    // Fetch all active subscribers
    const { data: subscribers, error } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("status", "active")

    if (error) {
      console.error("Failed to query newsletter subscribers:", error)
      return NextResponse.json({ message: "Database query failed" }, { status: 500 })
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ 
        message: "No active subscribers found.", 
        sentCount: 0 
      }, { status: 200 })
    }

    const emailList = subscribers.map((sub: { email: string }) => sub.email)

    // Chunk email list to max 45 to stay safe within Resend free limit and timeouts
    const chunkSize = 45
    const emailChunks: string[][] = []
    for (let i = 0; i < emailList.length; i += chunkSize) {
      emailChunks.push(emailList.slice(i, i + chunkSize))
    }

    // Send emails chunk by chunk
    let sentCount = 0
    for (const chunk of emailChunks) {
      await sendBroadcastEmail(chunk, subject.trim(), body)
      sentCount += chunk.length
    }

    return NextResponse.json({ 
      message: `Broadcast successfully sent to ${sentCount} subscribers!`, 
      sentCount 
    }, { status: 200 })

  } catch (err: any) {
    console.error("Email broadcast error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}
