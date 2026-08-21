import { NextResponse } from "next/server"
import { feedbackSchema } from "@/lib/validations/feedback"
import { createClientFeedback } from "@/lib/cms/testimonials"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = feedbackSchema.safeParse(body)

    if (!parsed.success) {
      const errorMsg = parsed.error.issues.map((i) => i.message).join(", ")
      return NextResponse.json(
        { error: errorMsg || "Invalid input data" },
        { status: 400 }
      )
    }

    const expectedToken = process.env.FEEDBACK_TOKEN || process.env.NEXT_PUBLIC_FEEDBACK_TOKEN

    if (!expectedToken || parsed.data.token !== expectedToken) {
      return NextResponse.json(
        { error: "Akses tidak valid atau token salah." },
        { status: 403 }
      )
    }

    const testimonial = await createClientFeedback(parsed.data)

    return NextResponse.json({
      success: true,
      message: "Terima kasih! Testimonial dan feedback Anda berhasil dikirim dan akan kami review.",
      testimonial,
    })
  } catch (error: any) {
    console.error("Error in POST /api/feedback:", error)
    return NextResponse.json(
      { error: error.message || "Gagal menyimpan testimonial." },
      { status: 500 }
    )
  }
}
