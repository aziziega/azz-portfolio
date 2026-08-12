import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { techStackSchema } from "@/lib/validations/tech-stack"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== process.env.ADMIN_ALLOWED_EMAIL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { data: techStack, error } = await supabase
      .from("tech_stacks")
      .select("*")
      .eq("id", id)
      .single()

    if (error || !techStack) {
      return NextResponse.json({ message: "Tech stack not found" }, { status: 404 })
    }

    return NextResponse.json({ techStack })
  } catch (err: any) {
    console.error("Get tech stack by id API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
      .update(result.data)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ message: "Tech stack updated", techStack })
  } catch (err: any) {
    console.error("Update tech stack API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== process.env.ADMIN_ALLOWED_EMAIL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { error } = await supabase
      .from("tech_stacks")
      .delete()
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ message: "Tech stack deleted" })
  } catch (err: any) {
    console.error("Delete tech stack API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}
