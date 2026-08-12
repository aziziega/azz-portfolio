import { notFound } from "next/navigation"
import { getTestimonialById } from "@/lib/cms/testimonials"
import TestimonialForm from "@/components/admin/testimonial-form"

export const metadata = {
  title: "Edit Testimonial | Admin CMS",
}

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const testimonial = await getTestimonialById(id)

  if (!testimonial) {
    notFound()
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Edit Testimonial</h1>
          <p className="admin-page-sub">Update details and bilingual quote for {testimonial.name}.</p>
        </div>
      </div>

      <TestimonialForm initialData={testimonial} isEditing={true} />
    </div>
  )
}
