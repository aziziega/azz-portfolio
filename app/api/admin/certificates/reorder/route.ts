import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { reorderCertificates } from "@/lib/cms/certificates"
import { reorderCertificatesSchema } from "@/lib/validations/certificate"

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== process.env.ADMIN_ALLOWED_EMAIL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const result = reorderCertificatesSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({
        message: "Invalid reorder request",
        errors: result.error.flatten().fieldErrors,
      }, { status: 400 })
    }

    await reorderCertificates(result.data.ids)
    return NextResponse.json({ message: "Certificates reordered successfully" })
  } catch (err: any) {
    console.error("Reorder certificates API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  return PATCH(request)
}
