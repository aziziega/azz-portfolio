import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { sendWelcomeEmail } from "@/lib/email/resend"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.redirect(`${SITE_URL}/?newsletter=invalid`)
  }

  try {
    const supabase = createAdminClient()

    // Find subscriber with this token
    const { data: subscriber, error: findError } = await supabase
      .from("newsletter_subscribers")
      .select("id, email, status")
      .eq("confirm_token", token)
      .single()

    if (findError || !subscriber) {
      return NextResponse.redirect(`${SITE_URL}/?newsletter=invalid`)
    }

    if (subscriber.status === "active") {
      // Already confirmed, just redirect to success
      return NextResponse.redirect(`${SITE_URL}/?newsletter=already_confirmed`)
    }

    // Activate subscriber and clear token
    const { error: updateError } = await supabase
      .from("newsletter_subscribers")
      .update({ 
        status: "active", 
        confirm_token: null 
      })
      .eq("id", subscriber.id)

    if (updateError) throw updateError

    // Send welcome email
    await sendWelcomeEmail(subscriber.email)

    return NextResponse.redirect(`${SITE_URL}/?newsletter=confirmed`)
  } catch (err: any) {
    console.error("Newsletter verify error:", err)
    return NextResponse.redirect(`${SITE_URL}/?newsletter=error`)
  }
}
