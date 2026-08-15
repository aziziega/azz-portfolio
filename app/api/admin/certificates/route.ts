import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { certificateSchema } from "@/lib/validations/certificate"
import { createCertificate, getAllCertificatesAdmin } from "@/lib/cms/certificates"

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== process.env.ADMIN_ALLOWED_EMAIL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const includeArchived = searchParams.get("archived") !== "false"

    const certificates = await getAllCertificatesAdmin(includeArchived)
    return NextResponse.json({ certificates })
  } catch (err: any) {
    console.error("GET admin certificates API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== process.env.ADMIN_ALLOWED_EMAIL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const result = certificateSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      }, { status: 400 })
    }

    const certificate = await createCertificate(result.data)
    return NextResponse.json({ message: "Certificate created", certificate })
  } catch (err: any) {
    console.error("Create certificate API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}
