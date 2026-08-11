import CertificateForm from "@/components/admin/certificate-form"

export default function NewCertificatePage() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Add New Certificate</h1>
          <p className="admin-page-subtitle">
            Upload and publish a new professional certificate or credential to your portfolio.
          </p>
        </div>
      </div>

      <div className="admin-card">
        <CertificateForm />
      </div>
    </div>
  )
}
