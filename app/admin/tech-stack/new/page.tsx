import TechStackForm from "@/components/admin/tech-stack-form"

export default function NewTechStackPage() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Add New Tech Stack</h1>
          <p className="admin-page-subtitle">
            Create a new technology item with custom icons and category.
          </p>
        </div>
      </div>

      <div className="admin-card">
        <TechStackForm />
      </div>
    </div>
  )
}
