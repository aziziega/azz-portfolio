import assert from "node:assert/strict"
import { certificateSchema, reorderCertificatesSchema } from "../lib/validations/certificate.ts"
import { resolveCertificate } from "../lib/cms/certificates.ts"

console.log("▶ Running Certificate Schema & Resolver Unit Tests...\n")

// Test 1: Valid Certificate Input
{
  const validData = {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    issue_date: "2024-05-12",
    credential_id: "AWS-12345",
    credential_url: "https://www.credly.com/badges/sample",
    image_url: "https://example.com/cert.png",
    pdf_url: "https://example.com/cert.pdf",
    description: { en: "Valid AWS cert", id: "Sertifikasi AWS valid" },
    featured: true,
    sort_order: 1,
    status: "published",
  }

  const result = certificateSchema.safeParse(validData)
  assert.equal(result.success, true, "Valid certificate data should pass schema validation")
  console.log("✔ Test 1 passed: Valid certificate schema validation")
}

// Test 2: Missing Required Fields (title, issuer, issue_date)
{
  const invalidData = {
    title: "",
    issuer: "",
    issue_date: "",
  }

  const result = certificateSchema.safeParse(invalidData)
  assert.equal(result.success, false, "Missing required fields should fail schema validation")
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    assert.ok(errors.title, "Title error should be present")
    assert.ok(errors.issuer, "Issuer error should be present")
    assert.ok(errors.issue_date, "Issue date error should be present")
  }
  console.log("✔ Test 2 passed: Missing required fields rejected with clear error messages")
}

// Test 3: Invalid URL validation
{
  const invalidUrlData = {
    title: "Google Cloud Engineer",
    issuer: "Google",
    issue_date: "2023-08-01",
    credential_url: "not-a-valid-url",
  }

  const result = certificateSchema.safeParse(invalidUrlData)
  assert.equal(result.success, false, "Invalid credential_url should fail validation")
  console.log("✔ Test 3 passed: Invalid URL format rejected")
}

// Test 4: Reorder Schema Validation
{
  const validReorder = {
    ids: ["e0a7df84-3c82-4ef8-b2a8-12c82f05a911", "b2c3d4e5-f6a7-4819-8012-3456789abcde"],
  }
  const invalidReorder = {
    ids: ["not-a-uuid"],
  }

  assert.equal(reorderCertificatesSchema.safeParse(validReorder).success, true, "Valid UUIDs should pass reorder schema")
  assert.equal(reorderCertificatesSchema.safeParse(invalidReorder).success, false, "Invalid UUIDs should fail reorder schema")
  console.log("✔ Test 4 passed: Reorder schema validates UUID array properly")
}

// Test 5: Resolver Function Mapping & Bilingual Fallback
{
  const dbRecord = {
    id: "cert-1",
    title: "Meta Front-End Developer",
    issuer: "Meta",
    issue_date: "2023-11-20",
    year: null,
    credential_id: "META-991",
    credential_url: "https://coursera.org/verify/META",
    image_url: "https://example.com/meta.jpg",
    pdf_url: "https://example.com/meta.pdf",
    description: { en: "English description", id: "Deskripsi Indonesia" },
    featured: true,
    sort_order: 2,
    status: "published",
    archived_at: null,
    created_at: "2023-11-20T00:00:00Z",
    updated_at: "2023-11-20T00:00:00Z",
  }

  const publicEn = resolveCertificate(dbRecord, "en")
  assert.equal(publicEn.year, 2023, "Year should be extracted from issue_date")
  assert.equal(publicEn.description, "English description", "Description should match requested language (en)")
  assert.equal(publicEn.credentialId, "META-991", "Credential ID should be mapped")
  assert.equal(publicEn.pdfUrl, "https://example.com/meta.pdf", "PDF URL should be mapped")

  const publicId = resolveCertificate(dbRecord, "id")
  assert.equal(publicId.description, "Deskripsi Indonesia", "Description should match requested language (id)")

  console.log("✔ Test 5 passed: Resolver correctly handles year extraction, bilingual text, and field mappings")
}

console.log("\n🎉 All 5 test suites passed successfully!\n")
