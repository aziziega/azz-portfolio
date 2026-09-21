import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createTestimonial } from "@/lib/cms/testimonials"
import { testimonialSchema } from "@/lib/validations/testimonial"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // Auth security check
    const { data: { user } } = await supabase.auth.getUser()
    if (
      !user?.email ||
      !process.env.ADMIN_ALLOWED_EMAIL ||
      user.email !== process.env.ADMIN_ALLOWED_EMAIL
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validated = testimonialSchema.parse(body)
    const newTestimonial = await createTestimonial(validated)

    return NextResponse.json(newTestimonial, { status: 201 })
  } catch (error: any) {
    console.error("Error creating testimonial:", error)
    if (error?.name === "ZodError") {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: error.message || "Failed to create testimonial" }, { status: 500 })
  }
}
