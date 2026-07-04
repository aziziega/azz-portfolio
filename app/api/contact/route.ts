import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { contactSchema } from "@/lib/validations/contact"

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

    const { name, email, subject, message } = result.data
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

    // Email dispatch placeholder
    console.log(`[EMAIL DISPATCH] Notification to aziziegatrim@gmail.com: New contact message from ${name} (${email}). Subject: ${subject}`)
    // Note for User: You can integrate resend, sendgrid, or nodemailer here to send emails.

    return NextResponse.json({ message: "Message sent successfully", data })
  } catch (err: any) {
    console.error("Contact submission error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}
