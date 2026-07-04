import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { updateSetting } from "@/lib/cms/site-settings"

export async function PUT(request: Request) {
  try {
    const supabase = await createClient()

    // Auth security check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== process.env.ADMIN_ALLOWED_EMAIL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Loop keys and update setting entries
    for (const [key, value] of Object.entries(body)) {
      await updateSetting(key, value)
    }

    return NextResponse.json({ message: "Site settings updated successfully" })
  } catch (err: any) {
    console.error("Update settings API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}
