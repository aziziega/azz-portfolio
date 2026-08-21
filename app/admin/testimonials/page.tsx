import { getAllTestimonialsAdmin } from "@/lib/cms/testimonials"
import TestimonialsList from "@/components/admin/testimonials-list"

export const revalidate = 0

export const metadata = {
  title: "Testimonials Management | Admin CMS",
}

export default async function AdminTestimonialsPage() {
  let testimonials: any[] = []
  try {
    testimonials = await getAllTestimonialsAdmin()
  } catch (err) {
    console.error("Failed to load testimonials:", err)
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Client Testimonials</h1>
          <p className="admin-page-sub">Manage client feedback and recommendations shown on your portfolio landing page.</p>
        </div>
      </div>

      <TestimonialsList initialTestimonials={testimonials} />
    </div>
  )
}
