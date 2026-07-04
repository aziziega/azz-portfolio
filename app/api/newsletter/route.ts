import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { newsletterSchema } from "@/lib/validations/newsletter"

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
    const supabase = await createClient()

    // Insert into newsletter_subscribers (RLS policy allows public insert)
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert([{
        email,
        status: "active",
        source: "website"
      }])
      .select()
      .single()

    if (error) {
      // Check for unique key constraint violation
      if (error.code === "23505") {
        return NextResponse.json({ 
          message: "You are already subscribed to our newsletter!", 
          code: "duplicate" 
        }, { status: 200 }) // Return 200 to keep it graceful and secure
      }
      throw error
    }

    // Email dispatch placeholder
    console.log(`[EMAIL DISPATCH] Confirmation to ${email}: Thank you for subscribing to Azizi Egatri M. newsletter!`)

    return NextResponse.json({ message: "Successfully subscribed", data })
  } catch (err: any) {
    console.error("Newsletter submission error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}
