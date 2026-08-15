import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { certificateSchema } from "@/lib/validations/certificate"
import { archiveCertificate, restoreCertificate, updateCertificate, deleteCertificate, getCertificateById } from "@/lib/cms/certificates"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== process.env.ADMIN_ALLOWED_EMAIL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const certificate = await getCertificateById(id)
    if (!certificate) {
      return NextResponse.json({ message: "Certificate not found" }, { status: 404 })
    }

    return NextResponse.json({ certificate })
  } catch (err: any) {
    console.error("GET certificate by ID error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    const certificate = await updateCertificate(id, result.data)
    return NextResponse.json({ message: "Certificate updated", certificate })
  } catch (err: any) {
    console.error("Update certificate API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== process.env.ADMIN_ALLOWED_EMAIL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    if (body.action === "archive") {
      const certificate = await archiveCertificate(id)
      return NextResponse.json({ message: "Certificate archived", certificate })
    }

    if (body.action === "restore") {
      const certificate = await restoreCertificate(id)
      return NextResponse.json({ message: "Certificate restored", certificate })
    }

    // Partial update
    const certificate = await updateCertificate(id, body)
    return NextResponse.json({ message: "Certificate updated", certificate })
  } catch (err: any) {
    console.error("PATCH certificate API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== process.env.ADMIN_ALLOWED_EMAIL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await deleteCertificate(id)
    return NextResponse.json({ message: "Certificate deleted" })
  } catch (err: any) {
    console.error("Delete certificate API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}
