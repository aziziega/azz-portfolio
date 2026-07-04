export const dynamic = "force-dynamic"

import { notFound } from "next/navigation"
import { getProjectById } from "@/lib/cms/projects"
import ProjectForm from "@/components/admin/project-form"
import { createClient } from "@/lib/supabase/server"

interface EditProjectPageProps {
  params: Promise<{ id: string }>
}

export const metadata = {
  title: "Edit Project — Portfolio CMS",
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) {
    notFound()
  }

  // Fetch gallery images
  const supabase = await createClient()
  const { data: images } = await supabase
    .from("project_images")
    .select("url")
    .eq("project_id", id)
    .order("sort_order", { ascending: true })
  
  const gallery = (images || []).map(img => img.url)

  const initialData = {
    ...project,
    gallery,
  }

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Edit Project: {project.title.en}</h2>
        <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
          Update project settings, translation copies, and tech stacks.
        </p>
      </div>

      <ProjectForm initialData={initialData} id={id} />
    </div>
  )
}
