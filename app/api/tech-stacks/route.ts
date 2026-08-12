import { NextResponse } from "next/server"
import { getPublicTechStacks } from "@/lib/cms/tech-stacks"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = (searchParams.get("lang") || "en") as "en" | "id"

    const techStacks = await getPublicTechStacks(lang)
    return NextResponse.json({ techStacks })
  } catch (err: any) {
    console.error("Public tech-stacks API error:", err)
    return NextResponse.json({ techStacks: [] }, { status: 500 })
  }
}
