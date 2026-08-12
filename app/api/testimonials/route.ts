import { NextResponse } from "next/server"
import { getPublicTestimonials } from "@/lib/cms/testimonials"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const langParam = searchParams.get("lang")
    const language = langParam === "id" ? "id" : "en"

    const testimonials = await getPublicTestimonials(language)
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Error in GET /api/testimonials:", error)
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}
