import TestimonialForm from "@/components/admin/testimonial-form"

export const metadata = {
  title: "New Testimonial | Admin CMS",
}

export default function NewTestimonialPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Add New Testimonial</h1>
          <p className="admin-page-sub">Create a new client feedback entry for your landing page.</p>
        </div>
      </div>

      <TestimonialForm />
    </div>
  )
}
