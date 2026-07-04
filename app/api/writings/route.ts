import { NextResponse } from "next/server"
import { getWritings } from "@/lib/cms/writings"

export async function GET() {
  try {
    const writings = await getWritings("published")
    return NextResponse.json({ writings })
  } catch (err: any) {
    console.error("Public writings API error:", err)
    return NextResponse.json({ writings: [] }, { status: 500 })
  }
}
