import { getAllTechStacksAdmin } from "@/lib/cms/tech-stacks"
import TechStackList from "@/components/admin/tech-stack-list"

export const revalidate = 0

export default async function AdminTechStackPage() {
  let techStacks: any[] = []
  try {
    techStacks = await getAllTechStacksAdmin()
  } catch (err) {
    console.error("Failed to load tech stacks:", err)
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Tech Stack Management</h1>
          <p className="admin-page-subtitle">
            Manage your technology stack items, categories, and icons displayed on the landing page.
          </p>
        </div>
      </div>

      <TechStackList initialTechStacks={techStacks} />
    </div>
  )
}
