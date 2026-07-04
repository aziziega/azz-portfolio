import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getWritings } from "@/lib/cms/writings"

export async function GET() {
  try {
    const supabase = await createClient()

    // Auth check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== process.env.ADMIN_ALLOWED_EMAIL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const writings = await getWritings("all")
    return NextResponse.json({ writings })
  } catch (err: any) {
    console.error("GET writings API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}
