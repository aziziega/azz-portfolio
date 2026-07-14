import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { newsletterSchema } from "@/lib/validations/newsletter"
import { sendConfirmationEmail } from "@/lib/email/resend"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate with Zod
    const result = newsletterSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ 
        message: "Invalid email address", 
        errors: result.error.flatten().fieldErrors 
      }, { status: 400 })
    }

    const { email } = result.data
    const supabase = createAdminClient()

    // Check if email already exists
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id, status")
      .eq("email", email)
      .single()

    if (existing) {
      if (existing.status === "active") {
        return NextResponse.json({ 
          message: "You are already subscribed to our newsletter!" 
        }, { status: 200 })
      }
      if (existing.status === "pending") {
        // Resend confirmation email for pending subscribers
        const newToken = crypto.randomUUID()
        await supabase
          .from("newsletter_subscribers")
          .update({ confirm_token: newToken })
          .eq("id", existing.id)
        await sendConfirmationEmail(email, newToken)
        return NextResponse.json({ 
          message: "A new confirmation email has been sent. Please check your inbox!" 
        }, { status: 200 })
      }
    }

    // Generate unique confirmation token
    const confirmToken = crypto.randomUUID()

    // Insert with "pending" status and token (Double Opt-in)
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert([{
        email,
        status: "pending",
        source: "website",
        confirm_token: confirmToken,
      }])
      .select()
      .single()

    if (error) {
      // Fallback duplicate check
      if (error.code === "23505") {
        return NextResponse.json({ 
          message: "You are already subscribed to our newsletter!" 
        }, { status: 200 })
      }
      throw error
    }

    // Send confirmation email via Resend
    await sendConfirmationEmail(email, confirmToken)

    return NextResponse.json({ 
      message: "Almost there! Please check your inbox and click the confirmation link to complete your subscription.",
      code: "pending_confirmation"
    })
  } catch (err: any) {
    console.error("Newsletter submission error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}
