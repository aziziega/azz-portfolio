import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { techStackSchema } from "@/lib/validations/tech-stack"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== process.env.ADMIN_ALLOWED_EMAIL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { data: techStacks, error } = await supabase
      .from("tech_stacks")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ techStacks })
  } catch (err: any) {
    console.error("Get admin tech-stacks API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== process.env.ADMIN_ALLOWED_EMAIL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const result = techStackSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      }, { status: 400 })
    }

    const { data: techStack, error } = await supabase
      .from("tech_stacks")
      .insert([result.data])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ message: "Tech stack created", techStack })
  } catch (err: any) {
    console.error("Create tech-stack API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}
