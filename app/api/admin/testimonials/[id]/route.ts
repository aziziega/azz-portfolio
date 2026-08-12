import { NextResponse } from "next/server"
import { updateTestimonial, deleteTestimonial } from "@/lib/cms/testimonials"
import { testimonialSchema } from "@/lib/validations/testimonial"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validated = testimonialSchema.parse(body)
    const updated = await updateTestimonial(id, validated)

    return NextResponse.json(updated)
  } catch (error: any) {
    console.error("Error updating testimonial:", error)
    if (error?.name === "ZodError") {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: error.message || "Failed to update testimonial" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteTestimonial(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error deleting testimonial:", error)
    return NextResponse.json({ error: error.message || "Failed to delete testimonial" }, { status: 500 })
  }
}
