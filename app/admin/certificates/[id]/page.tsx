import { notFound } from "next/navigation"
import { getCertificateById } from "@/lib/cms/certificates"
import CertificateForm from "@/components/admin/certificate-form"

export const revalidate = 0

export default async function EditCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const certificate = await getCertificateById(id)

  if (!certificate) {
    notFound()
  }

  const displayTitle = typeof certificate.title === "object" && certificate.title !== null
    ? certificate.title.en || certificate.title.id || ""
    : typeof certificate.title === "string" && certificate.title.startsWith("{")
      ? (() => {
          try {
            const p = JSON.parse(certificate.title)
            return p.en || p.id || certificate.title
          } catch {
            return certificate.title
          }
        })()
      : certificate.title || ""

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Edit Certificate</h1>
          <p className="admin-page-subtitle">
            Update details for &quot;{displayTitle}&quot;.
          </p>
        </div>
      </div>

      <div className="admin-card">
        <CertificateForm initialData={certificate} id={id} />
      </div>
    </div>
  )
}
