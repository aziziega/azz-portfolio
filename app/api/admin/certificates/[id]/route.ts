import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { certificateSchema } from "@/lib/validations/certificate"

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

    const { data: certificate, error } = await supabase
      .from("certificates")
      .update(result.data)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ message: "Certificate updated", certificate })
  } catch (err: any) {
    console.error("Update certificate API error:", err)
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

    const { error } = await supabase
      .from("certificates")
      .delete()
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ message: "Certificate deleted" })
  } catch (err: any) {
    console.error("Delete certificate API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}
