import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { contactSchema } from "@/lib/validations/contact"
import { sendContactNotificationEmail } from "@/lib/email/resend"

export async function POST(request: Request) {
  try {
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

    const supabase = await createClient()

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

    return NextResponse.json({ message: "Message sent successfully", data })
  } catch (err: any) {
    console.error("Contact submission error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}
