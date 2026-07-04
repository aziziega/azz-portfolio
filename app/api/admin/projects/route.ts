import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { projectSchema } from "@/lib/validations/project"

export async function POST(request: Request) {
  try {
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

    // Insert project
    const { data: createdProject, error: projectError } = await supabase
      .from("projects")
      .insert([result.data])
      .select()
      .single()

    if (projectError) throw projectError

    // Insert gallery images
    if (gallery && gallery.length > 0) {
      const imageRecords = gallery.map((url: string, index: number) => ({
        project_id: createdProject.id,
        url,
        sort_order: index,
        alt: { en: createdProject.title.en, id: createdProject.title.id || "" }
      }))

      const { error: imagesError } = await supabase
        .from("project_images")
        .insert(imageRecords)

      if (imagesError) throw imagesError
    }

    return NextResponse.json({ message: "Project created", project: createdProject })
  } catch (err: any) {
    console.error("Create project API error:", err)
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 })
  }
}
