import { NextResponse } from "next/server"
import { getPublicCertificates } from "@/lib/cms/certificates"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = (searchParams.get("lang") || "en") as "en" | "id"

    const certificates = await getPublicCertificates(lang)
    return NextResponse.json({ certificates })
  } catch (err: any) {
    console.error("Public certificates API error:", err)
    return NextResponse.json({ certificates: [] }, { status: 500 })
  }
}
