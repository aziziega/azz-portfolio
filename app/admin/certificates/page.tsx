import { getAllCertificatesAdmin } from "@/lib/cms/certificates"
import CertificatesList from "@/components/admin/certificates-list"

export const revalidate = 0

export default async function AdminCertificatesPage() {
  let certificates: any[] = []
  try {
    certificates = await getAllCertificatesAdmin()
  } catch (err) {
    console.error("Failed to load certificates:", err)
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Certificates Management</h1>
          <p className="admin-page-subtitle">
            Manage your professional certifications, credentials, and lightbox previews displayed on the landing page.
          </p>
        </div>
      </div>

      <CertificatesList initialCertificates={certificates} />
    </div>
  )
}
