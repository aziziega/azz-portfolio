import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    const adminUsername = process.env.ADMIN_LOGIN_USERNAME
    const adminEmail = process.env.ADMIN_ALLOWED_EMAIL

    if (!adminUsername || !adminEmail) {
      return NextResponse.json(
        { message: "Admin login is not configured" },
        { status: 500 }
      )
    }

    if (!username || !password || username !== adminUsername) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      )
    }

    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password,
    })

    if (error || data.user?.email !== adminEmail) {
      await supabase.auth.signOut()
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      )
    }

    return NextResponse.json({ message: "Signed in" })
  } catch {
    return NextResponse.json(
      { message: "Unable to sign in" },
      { status: 400 }
    )
  }
}
