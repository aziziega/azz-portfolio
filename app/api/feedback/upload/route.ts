import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const token = formData.get("token") as string | null

    const expectedToken = process.env.FEEDBACK_TOKEN || process.env.NEXT_PUBLIC_FEEDBACK_TOKEN

    if (!expectedToken || token !== expectedToken) {
      return NextResponse.json(
        { error: "Akses tidak valid atau token salah." },
        { status: 403 }
      )
    }

    if (!file) {
      return NextResponse.json(
        { error: "File gambar tidak ditemukan." },
        { status: 400 }
      )
    }

    // Validate mime type (images only)
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Hanya file gambar (JPG, PNG, WebP) yang diperbolehkan." },
        { status: 400 }
      )
    }

    // Limit file size to 4MB
    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Ukuran gambar maksimal 4MB." },
        { status: 400 }
      )
    }

    const fileExt = file.name.split(".").pop() || "png"
    const fileName = `testimonials/client_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const supabase = createAdminClient()
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("site-assets")
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: true,
      })

    if (uploadError) {
      console.error("Storage upload error:", uploadError)
      throw new Error(uploadError.message || "Gagal mengupload avatar.")
    }

    const { data: { publicUrl } } = supabase.storage
      .from("site-assets")
      .getPublicUrl(fileName)

    return NextResponse.json({
      success: true,
      url: publicUrl,
    })
  } catch (error: any) {
    console.error("Error in POST /api/feedback/upload:", error)
    return NextResponse.json(
      { error: error.message || "Gagal mengupload gambar." },
      { status: 500 }
    )
  }
}
