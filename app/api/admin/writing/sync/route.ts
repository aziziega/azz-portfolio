import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { syncFromMedium } from "@/lib/cms/writings"

export async function POST() {
  try {
    const supabase = await createClient()

    // Auth check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== process.env.ADMIN_ALLOWED_EMAIL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const result = await syncFromMedium()
    return NextResponse.json({ message: "Medium RSS feed synchronized", ...result })
  } catch (err: any) {
    console.error("Medium sync API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}
