import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { contactSchema } from "@/lib/validations/contact"
import { sendContactNotificationEmail } from "@/lib/email/resend"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// Allow 3 messages per hour per IP to prevent spam
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 h"),
})

export async function POST(request: Request) {
  try {
    // Rate Limiting Security Check
    const ip = request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1"
    const { success } = await ratelimit.limit(`contact_rate_limit_${ip}`)
    
    if (!success) {
      return NextResponse.json({ 
        message: "Too many requests. Please try again later." 
      }, { status: 429 })
    }

    const body = await request.json()
    
    // Validate with Zod
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ 
        message: "Validation failed", 
        errors: result.error.flatten().fieldErrors 
      }, { status: 400 })
    }

    const { name, email, subject, message, name_honey } = result.data

    // Honeypot anti-spam bot check
    if (name_honey && name_honey.trim() !== "") {
      console.warn(`[SPAM PREVENTION] Bot submission caught via honeypot. Name: ${name}, Email: ${email}`)
      return NextResponse.json({ message: "Message sent successfully" })
    }

    const supabase = createAdminClient()

    // Insert into contact_messages (RLS policy allows public insert)
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([{
        name,
        email,
        subject,
        message,
        status: "new",
        source: "contact_form"
      }])
      .select()
      .single()

    if (error) throw error

    // Email dispatch notification to Admin
    try {
      await sendContactNotificationEmail(name, email, subject, message)
    } catch (emailErr) {
      console.error("Failed to dispatch admin notification email:", emailErr)
    }

    return NextResponse.json({ message: "Message sent successfully" })
  } catch (err: any) {
    console.error("Contact submission error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}
