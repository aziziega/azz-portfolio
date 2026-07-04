import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { projectSchema } from "@/lib/validations/project"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Auth security check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== process.env.ADMIN_ALLOWED_EMAIL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { project, gallery } = await request.json()

    // Validate with Zod
    const result = projectSchema.safeParse(project)
    if (!result.success) {
      return NextResponse.json({ 
        message: "Validation failed", 
        errors: result.error.flatten().fieldErrors 
      }, { status: 400 })
    }

    // Update project
    const { data: updatedProject, error: projectError } = await supabase
      .from("projects")
      .update(result.data)
      .eq("id", id)
      .select()
      .single()

    if (projectError) throw projectError

    // Synchronize gallery images: delete existing and replace with new set
    const { error: deleteError } = await supabase
      .from("project_images")
      .delete()
      .eq("project_id", id)

    if (deleteError) throw deleteError

    if (gallery && gallery.length > 0) {
      const imageRecords = gallery.map((url: string, index: number) => ({
        project_id: id,
        url,
        sort_order: index,
        alt: { en: updatedProject.title.en, id: updatedProject.title.id || "" }
      }))

      const { error: imagesError } = await supabase
        .from("project_images")
        .insert(imageRecords)

      if (imagesError) throw imagesError
    }

    return NextResponse.json({ message: "Project updated", project: updatedProject })
  } catch (err: any) {
    console.error("Update project API error:", err)
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

    // Auth security check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== process.env.ADMIN_ALLOWED_EMAIL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (err: any) {
    console.error("Delete project API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}
