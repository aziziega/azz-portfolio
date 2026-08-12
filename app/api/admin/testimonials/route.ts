import { NextResponse } from "next/server"
import { createTestimonial } from "@/lib/cms/testimonials"
import { testimonialSchema } from "@/lib/validations/testimonial"

export async function POST(request: Request) {
  try {
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
