import { getTechStackById } from "@/lib/cms/tech-stacks"
import TechStackForm from "@/components/admin/tech-stack-form"
import { notFound } from "next/navigation"

export const revalidate = 0

interface EditTechStackPageProps {
  params: Promise<{ id: string }>
}

export default async function EditTechStackPage({ params }: EditTechStackPageProps) {
  const { id } = await params
  const techStack = await getTechStackById(id)

  if (!techStack) {
    notFound()
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Edit Tech Stack: {techStack.name}</h1>
          <p className="admin-page-subtitle">
            Update tech stack details, icon URL, or category group.
          </p>
        </div>
      </div>

      <TechStackForm initialData={techStack} id={id} />
    </div>
  )
}
