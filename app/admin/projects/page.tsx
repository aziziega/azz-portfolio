export const dynamic = "force-dynamic"

import { getAllProjectsAdmin } from "@/lib/cms/projects"
import ProjectsList from "@/components/admin/projects-list"

export const metadata = {
  title: "Work Projects — Portfolio CMS",
}

export default async function AdminProjectsPage() {
  let projects: any[] = []

  try {
    projects = await getAllProjectsAdmin()
  } catch (e) {
    console.error("Error loading projects list:", e)
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Manage Portfolio Works</h2>
          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
            Add, update, features, reorder or pin works to highlight on the homepage.
          </p>
        </div>
      </div>
      
      <ProjectsList initialProjects={projects} />
    </div>
  )
}
