import { NextResponse } from "next/server"
import { getPublicProjects } from "@/lib/cms/projects"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = (searchParams.get("lang") || "en") as "en" | "id"

    const projects = await getPublicProjects(lang)
    return NextResponse.json({ projects })
  } catch (err: any) {
    console.error("Public projects API error:", err)
    return NextResponse.json({ projects: [] }, { status: 500 })
  }
}
