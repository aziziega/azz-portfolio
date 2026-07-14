"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { type ProjectInput } from "@/lib/validations/project"
import LocalizedField from "./localized-field"
import ImageUploader from "./image-uploader"
import SortableList from "./sortable-list"

interface ProjectFormProps {
  initialData?: any
  id?: string
}

export default function ProjectForm({ initialData, id }: ProjectFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [deleteGalleryIdx, setDeleteGalleryIdx] = useState<number | null>(null)
  const [deleteTag, setDeleteTag] = useState<string | null>(null)

  // Form Fields
  const [slug, setSlug] = useState(initialData?.slug || "")
  const [status, setStatus] = useState<"draft" | "published" | "archived">(initialData?.status || "draft")
  const [featured, setFeatured] = useState(initialData?.featured || false)
  const [sortOrder, setSortOrder] = useState(initialData?.sort_order || 0)
  const [year, setYear] = useState<number>(initialData?.year || new Date().getFullYear())
  const [liveUrl, setLiveUrl] = useState(initialData?.live_url || "")
  const [githubUrl, setGithubUrl] = useState(initialData?.github_url || "")

  // Bilingual Fields
  const [title, setTitle] = useState(initialData?.title || { en: "", id: "" })
  const [tagline, setTagline] = useState(initialData?.tagline || { en: "", id: "" })
  const [description, setDescription] = useState(initialData?.description || { en: "", id: "" })
  const [category, setCategory] = useState(initialData?.category || { en: "", id: "" })
  const [duration, setDuration] = useState(initialData?.duration || { en: "", id: "" })
  const [role, setRole] = useState(initialData?.role || { en: "", id: "" })
  const [client, setClient] = useState(initialData?.client || { en: "", id: "" })
  const [teamSize, setTeamSize] = useState(initialData?.team_size || { en: "", id: "" })
  const [problem, setProblem] = useState(initialData?.problem || { en: "", id: "" })
  const [solution, setSolution] = useState(initialData?.solution || { en: "", id: "" })

  // Dynamic Array Lists
  const [features, setFeatures] = useState(initialData?.features || [])
  const [challenges, setChallenges] = useState(initialData?.challenges || [])
  const [outcomes, setOutcomes] = useState(initialData?.outcomes || [])
  const [designProcess, setDesignProcess] = useState(initialData?.design_process || [])
  const [lessonsLearned, setLessonsLearned] = useState(initialData?.lessons_learned || [])

  // Tech Stack Tag Input
  const [techInput, setTechInput] = useState("")
  const [techStack, setTechStack] = useState<string[]>(initialData?.tech_stack || [])

  // Image Uploads
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnail_url || "")
  const [galleryImages, setGalleryImages] = useState<string[]>(initialData?.gallery || [])

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState(initialData?.seo_title || { en: "", id: "" })
  const [seoDescription, setSeoDescription] = useState(initialData?.seo_description || { en: "", id: "" })

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      const tag = techInput.trim()
      if (tag && !techStack.includes(tag)) {
        setTechStack([...techStack, tag])
      }
      setTechInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTechStack(techStack.filter(t => t !== tag))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (!thumbnailUrl || thumbnailUrl.trim() === "") {
        throw new Error("Project Main Thumbnail is required. Please upload or specify a thumbnail image.")
      }

      const payload: ProjectInput = {
        slug,
        status,
        featured,
        sort_order: Number(sortOrder),
        year: year ? Number(year) : null,
        title,
        tagline,
        description,
        category,
        duration,
        role,
        client,
        team_size: teamSize,
        problem,
        solution,
        features,
        challenges,
        outcomes,
        design_process: designProcess,
        lessons_learned: lessonsLearned,
        tech_stack: techStack,
        thumbnail_url: thumbnailUrl,
        live_url: liveUrl || null,
        github_url: githubUrl || null,
        seo_title: seoTitle,
        seo_description: seoDescription,
      }

      // POST/PUT database request via route API or Client Action
      const endpoint = id ? `/api/admin/projects/${id}` : "/api/admin/projects"
      const response = await fetch(endpoint, {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project: payload, gallery: galleryImages }),
      })

      if (!response.ok) {
        const resData = await response.json()
        throw new Error(resData.message || "Failed to save project")
      }

      if (id) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
        router.refresh()
      } else {
        router.push("/admin/projects")
        router.refresh()
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Something went wrong")
      setTimeout(() => setError(""), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="admin-form">
      {success && <div className="admin-toast success">⚙️ Project configurations saved successfully!</div>}
      {error && <div className="admin-toast error">❌ {error}</div>}

      {/* Meta Controls */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Project Slug (lowercase, alphanumeric, hyphens)</label>
          <input
            type="text"
            className="admin-form-input"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
            placeholder="e.g. gymflow-crm"
            required
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Publishing Status</label>
          <select
            className="admin-form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Sort Order (integer)</label>
          <input
            type="number"
            className="admin-form-input"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            required
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Release Year</label>
          <input
            type="number"
            className="admin-form-input"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            required
          />
        </div>
      </div>

      <div className="admin-form-group" style={{ flexDirection: "row", gap: "10px", alignItems: "center" }}>
        <label className="admin-toggle">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          <span className="admin-toggle-slider" />
        </label>
        <span className="admin-form-label">Pin project as Featured (shows in hero marquee/home featured grid)</span>
      </div>

      {/* Bilingual Fields */}
      <LocalizedField
        label="Project Title"
        valueEn={title.en}
        valueId={title.id}
        onChangeEn={(val) => setTitle({ ...title, en: val })}
        onChangeId={(val) => setTitle({ ...title, id: val })}
        placeholderEn="e.g. GymFlow CRM"
        placeholderId="e.g. GymFlow CRM"
        required
      />

      <LocalizedField
        label="Tagline (One-liner card description)"
        valueEn={tagline.en}
        valueId={tagline.id}
        onChangeEn={(val) => setTagline({ ...tagline, en: val })}
        onChangeId={(val) => setTagline({ ...tagline, id: val })}
        placeholderEn="e.g. Scalable CRM system for fitness centers"
        placeholderId="e.g. Sistem CRM berskala besar untuk pusat kebugaran"
        required
      />

      <LocalizedField
        label="Main Project Overview Description"
        valueEn={description.en}
        valueId={description.id}
        onChangeEn={(val) => setDescription({ ...description, en: val })}
        onChangeId={(val) => setDescription({ ...description, id: val })}
        type="textarea"
        placeholderEn="Detailed overview..."
        placeholderId="Deskripsi detail..."
        required
      />

      <div className="admin-form-row">
        <LocalizedField
          label="Category"
          valueEn={category.en}
          valueId={category.id}
          onChangeEn={(val) => setCategory({ ...category, en: val })}
          onChangeId={(val) => setCategory({ ...category, id: val })}
          placeholderEn="e.g. Web App"
          placeholderId="e.g. Aplikasi Web"
        />
        <LocalizedField
          label="Development Duration"
          valueEn={duration.en}
          valueId={duration.id}
          onChangeEn={(val) => setDuration({ ...duration, en: val })}
          onChangeId={(val) => setDuration({ ...duration, id: val })}
          placeholderEn="e.g. 4 months"
          placeholderId="e.g. 4 bulan"
        />
      </div>

      <div className="admin-form-row">
        <LocalizedField
          label="Your Role"
          valueEn={role.en}
          valueId={role.id}
          onChangeEn={(val) => setRole({ ...role, en: val })}
          onChangeId={(val) => setRole({ ...role, id: val })}
          placeholderEn="e.g. Fullstack Developer"
          placeholderId="e.g. Fullstack Developer"
        />
        <LocalizedField
          label="Client Name"
          valueEn={client.en}
          valueId={client.id}
          onChangeEn={(val) => setClient({ ...client, en: val })}
          onChangeId={(val) => setClient({ ...client, id: val })}
          placeholderEn="e.g. FitnessPro"
          placeholderId="e.g. FitnessPro"
        />
      </div>

      <LocalizedField
        label="Team Size"
        valueEn={teamSize.en}
        valueId={teamSize.id}
        onChangeEn={(val) => setTeamSize({ ...teamSize, en: val })}
        onChangeId={(val) => setTeamSize({ ...teamSize, id: val })}
        placeholderEn="e.g. Solo Project"
        placeholderId="e.g. Proyek Solo"
      />

      {/* Media */}
      <ImageUploader
        label="Project Main Thumbnail (Required)"
        value={thumbnailUrl}
        onChange={setThumbnailUrl}
        projectSlug={slug || "thumbnail"}
      />

      {/* Project Gallery */}
      <div className="admin-form-group">
        <label className="admin-form-label">Project Gallery (Showcase Images)</label>
        <p style={{ fontSize: "12px", color: "#64748b", marginTop: "-4px", marginBottom: "12px" }}>
          Upload screenshots or graphics to display in the project's image gallery section.
        </p>

        {galleryImages.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "12px", marginBottom: "12px" }}>
            {galleryImages.map((imgUrl, idx) => (
              <div key={idx} className="admin-image-preview" style={{ margin: 0, position: "relative" }}>
                <img src={imgUrl} alt={`Gallery ${idx + 1}`} style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "8px" }} />
                <div className="admin-image-preview-actions" style={{ position: "absolute", bottom: "4px", right: "4px" }}>
                  <button
                    type="button"
                    onClick={() => setDeleteGalleryIdx(idx)}
                    className="admin-btn admin-btn-danger admin-btn-sm"
                    style={{ padding: "2px 6px", fontSize: "10px" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <ImageUploader
          label="Add Image to Gallery"
          value=""
          onChange={(url) => {
            if (url && !galleryImages.includes(url)) {
              setGalleryImages([...galleryImages, url])
            }
          }}
          projectSlug={slug || "gallery"}
        />
      </div>

      {/* Tech Stack Input */}
      <div className="admin-form-group">
        <label className="admin-form-label">Tech Stack (Type tag name and hit Enter)</label>
        <div className="admin-tag-input-wrap">
          {techStack.map((tag) => (
            <span key={tag} className="admin-tag">
              {tag}
               <button
                type="button"
                className="admin-tag-remove"
                onClick={() => setDeleteTag(tag)}
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            className="admin-tag-input"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Add technology..."
          />
        </div>
      </div>

      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Live App Demo URL</label>
          <input
            type="url"
            className="admin-form-input"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            name="live_url"
            placeholder="https://..."
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">GitHub Repository URL</label>
          <input
            type="url"
            className="admin-form-input"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            name="github_url"
            placeholder="https://github.com/..."
          />
        </div>
      </div>

      {/* Bilingual Problem & Solution */}
      <LocalizedField
        label="The Challenge / Problem"
        valueEn={problem.en}
        valueId={problem.id}
        onChangeEn={(val) => setProblem({ ...problem, en: val })}
        onChangeId={(val) => setProblem({ ...problem, id: val })}
        type="textarea"
        placeholderEn="Describe what challenges you faced..."
        placeholderId="Gambarkan apa tantangan yang dihadapi..."
      />

      <LocalizedField
        label="The Solution"
        valueEn={solution.en}
        valueId={solution.id}
        onChangeEn={(val) => setSolution({ ...solution, en: val })}
        onChangeId={(val) => setSolution({ ...solution, id: val })}
        type="textarea"
        placeholderEn="Describe how you solved it..."
        placeholderId="Gambarkan bagaimana solusi Anda..."
      />

      {/* Bilingual Dynamic Lists */}
      <SortableList
        label="Key Features & Core Integrations"
        items={features}
        onChange={setFeatures}
        placeholderEn="English feature..."
        placeholderId="Fitur Indonesia..."
      />

      <SortableList
        label="Detailed Technical Challenges & Webhook scenarios"
        items={challenges}
        onChange={setChallenges}
        placeholderEn="English challenge..."
        placeholderId="Tantangan Indonesia..."
      />

      <SortableList
        label="Outcomes & Metrics"
        items={outcomes}
        onChange={setOutcomes}
        placeholderEn="English outcome..."
        placeholderId="Hasil Indonesia..."
      />

      <SortableList
        label="Design Process & Architecture Layout"
        items={designProcess}
        onChange={setDesignProcess}
        placeholderEn="English process step..."
        placeholderId="Langkah proses Indonesia..."
      />

      <SortableList
        label="Lessons Learned"
        items={lessonsLearned}
        onChange={setLessonsLearned}
        placeholderEn="English lesson..."
        placeholderId="Pelajaran Indonesia..."
      />

      {/* SEO Bilingual Config */}
      <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid #e2e8f0" }}>
        <h3 className="admin-section-title">SEO Optimization</h3>
        
        <LocalizedField
          label="Custom SEO Meta Title (Fallback to project title if blank)"
          valueEn={seoTitle.en}
          valueId={seoTitle.id}
          onChangeEn={(val) => setSeoTitle({ ...seoTitle, en: val })}
          onChangeId={(val) => setSeoTitle({ ...seoTitle, id: val })}
        />

        <LocalizedField
          label="Custom SEO Meta Description"
          valueEn={seoDescription.en}
          valueId={seoDescription.id}
          onChangeEn={(val) => setSeoDescription({ ...seoDescription, en: val })}
          onChangeId={(val) => setSeoDescription({ ...seoDescription, id: val })}
          type="textarea"
        />
      </div>

      {/* Submit Controls */}
      <div className="admin-form-actions">
        <button
          type="submit"
          disabled={loading}
          className="admin-btn admin-btn-primary"
        >
          {loading ? "Saving Project..." : "Save Project Config"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="admin-btn admin-btn-secondary"
        >
          Cancel
        </button>
      </div>

      {deleteGalleryIdx !== null && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1100,
          animation: "fadeIn 0.2s ease-out"
        }}>
          <div style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            width: "100%",
            maxWidth: "400px",
            animation: "scaleIn 0.2s ease-out",
            textAlign: "left"
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>
              ⚠️ Remove Gallery Image?
            </h3>
            <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.5, marginBottom: "20px" }}>
              Are you sure you want to remove this image from the gallery?
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => setDeleteGalleryIdx(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={() => {
                  setGalleryImages(galleryImages.filter((_, i) => i !== deleteGalleryIdx))
                  setDeleteGalleryIdx(null)
                }}
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTag !== null && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1100,
          animation: "fadeIn 0.2s ease-out"
        }}>
          <div style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            width: "100%",
            maxWidth: "400px",
            animation: "scaleIn 0.2s ease-out",
            textAlign: "left"
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>
              ⚠️ Remove Technology Tag?
            </h3>
            <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.5, marginBottom: "20px" }}>
              Are you sure you want to remove the tag <strong>"{deleteTag}"</strong> from the tech stack?
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => setDeleteTag(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={() => {
                  handleRemoveTag(deleteTag)
                  setDeleteTag(null)
                }}
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </form>
  )
}
