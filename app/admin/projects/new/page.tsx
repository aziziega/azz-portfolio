import ProjectForm from "@/components/admin/project-form"

export const metadata = {
  title: "New Project — Portfolio CMS",
}

export default function NewProjectPage() {
  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Create New Project</h2>
        <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
          Fill in the details to publish a new bilingual project.
        </p>
      </div>

      <ProjectForm />
    </div>
  )
}
