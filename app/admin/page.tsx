export const dynamic = "force-dynamic"

import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import CopyFeedbackBtn from "@/components/admin/copy-feedback-btn"
import {
  ArrowRight,
  Award,
  FileText,
  Home,
  Inbox,
  Layers,
  Mail,
  MessageSquareQuote,
  Newspaper,
  Rocket,
  Settings,
  Star,
  Clock,
  CheckCircle2,
} from "lucide-react"

async function getStats() {
  const supabase = await createClient()
  
  const [projects, messages, subscribers, writings, testimonials, certificates] = await Promise.all([
    supabase.from("projects").select("id, status, featured, title, slug, updated_at", { count: "exact" }).order("updated_at", { ascending: false }),
    supabase.from("contact_messages").select("id, status, name, subject, created_at", { count: "exact" }).order("created_at", { ascending: false }),
    supabase.from("newsletter_subscribers").select("id, status", { count: "exact" }),
    supabase.from("external_writings").select("id, status", { count: "exact" }),
    supabase.from("testimonials").select("id, name, role, company, status, source, feedback, created_at", { count: "exact" }).order("created_at", { ascending: false }),
    supabase.from("certificates").select("id, title", { count: "exact" }),
  ])

  const projectData = projects.data || []
  const messageData = messages.data || []
  const subscriberData = subscribers.data || []
  const writingData = writings.data || []
  const testimonialData = testimonials.data || []
  const certificateData = certificates.data || []

  return {
    publishedProjects: projectData.filter(p => p.status === "published").length,
    draftProjects: projectData.filter(p => p.status === "draft").length,
    featuredProjects: projectData.filter(p => p.featured).length,
    newMessages: messageData.filter(m => m.status === "new").length,
    totalMessages: messageData.length,
    activeSubscribers: subscriberData.filter(s => s.status === "active").length,
    pendingSubscribers: subscriberData.filter(s => s.status === "pending").length,
    publishedWritings: writingData.filter(w => w.status === "published").length,
    hiddenWritings: writingData.filter(w => w.status === "hidden").length,
    pendingTestimonials: testimonialData.filter(t => t.status === "pending").length,
    publishedTestimonials: testimonialData.filter(t => t.status === "published").length,
    totalTestimonials: testimonialData.length,
    totalCertificates: certificateData.length,
    recentProjects: projectData.slice(0, 4),
    recentMessages: messageData.slice(0, 4),
    recentTestimonials: testimonialData.slice(0, 4),
  }
}

export default async function AdminDashboard() {
  let stats = {
    publishedProjects: 0,
    draftProjects: 0,
    featuredProjects: 0,
    newMessages: 0,
    totalMessages: 0,
    activeSubscribers: 0,
    pendingSubscribers: 0,
    publishedWritings: 0,
    hiddenWritings: 0,
    pendingTestimonials: 0,
    publishedTestimonials: 0,
    totalTestimonials: 0,
    totalCertificates: 0,
    recentProjects: [] as any[],
    recentMessages: [] as any[],
    recentTestimonials: [] as any[],
  }

  try {
    stats = await getStats()
  } catch (e) {
    // Tables might not exist yet — show zeros
  }

  const feedbackToken = process.env.FEEDBACK_TOKEN || process.env.NEXT_PUBLIC_FEEDBACK_TOKEN || "azz-client-feedback-key"

  const kpiItems = [
    {
      key: "publishedProjects",
      value: stats.publishedProjects,
      label: "Published Projects",
      description: "Live on portfolio work",
      icon: Rocket,
      tone: "blue",
    },
    {
      key: "pendingTestimonials",
      value: stats.pendingTestimonials,
      label: "Pending Reviews",
      description: stats.pendingTestimonials > 0 ? "Awaiting your approval" : "All reviews reviewed",
      icon: MessageSquareQuote,
      tone: stats.pendingTestimonials > 0 ? "amber" : "emerald",
      highlight: stats.pendingTestimonials > 0,
    },
    {
      key: "newMessages",
      value: stats.newMessages,
      label: "New Messages",
      description: "Unread contact inbox",
      icon: Inbox,
      tone: "cyan",
    },
    {
      key: "activeSubscribers",
      value: stats.activeSubscribers,
      label: "Subscribers",
      description: "Active newsletter list",
      icon: Mail,
      tone: "emerald",
    },
  ]

  const quickActions = [
    {
      href: "/admin/site",
      label: "Site & Home",
      description: "Update hero, profile, social links, and homepage copy.",
      icon: Home,
      tone: "blue",
    },
    {
      href: "/admin/projects/new",
      label: "New Project",
      description: "Create a portfolio work case study and publish it.",
      icon: FileText,
      tone: "cyan",
    },
    {
      href: "/admin/testimonials",
      label: "Testimonials & Feedback",
      description: "Review client submissions, approve reviews, and read feedback.",
      icon: MessageSquareQuote,
      tone: "amber",
    },
    {
      href: "/admin/certificates",
      label: "Certificates",
      description: "Upload, reorder, and manage credentials & licenses.",
      icon: Award,
      tone: "indigo",
    },
    {
      href: "/admin/tech-stack",
      label: "Tech Stack",
      description: "Update technologies, tools, proficiencies, and icons.",
      icon: Layers,
      tone: "emerald",
    },
    {
      href: "/admin/writing",
      label: "Blog Writing",
      description: "Sync, feature, hide, and curate external Medium articles.",
      icon: Newspaper,
      tone: "violet",
    },
    {
      href: "/admin/messages",
      label: "Contact Inbox",
      description: "Read visitor inquiries and reply directly via email.",
      icon: Inbox,
      tone: "sky",
    },
    {
      href: "/admin/newsletter",
      label: "Newsletter Hub",
      description: "Monitor subscribers and broadcast email updates.",
      icon: Mail,
      tone: "teal",
    },
    {
      href: "/admin/site",
      label: "Site Settings & SEO",
      description: "Keep SEO metadata, bio, and site bindings updated.",
      icon: Settings,
      tone: "slate",
    },
  ]

  return (
    <div className="admin-dashboard">
      {/* Welcome Card & Action Bar */}
      <section className="admin-welcome-card">
        <div>
          <p className="admin-eyebrow">Portfolio CMS Control Center</p>
          <h2>Manage your portfolio and client reviews from one workspace.</h2>
          <p>Update homepage copy, publish case studies, approve client testimonials, and broadcast newsletter updates.</p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          <CopyFeedbackBtn token={feedbackToken} />
          <Link href="/" target="_blank" className="admin-btn admin-btn-primary">
            View Live Site <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* KPI Cards Grid */}
      <section className="admin-kpi-grid">
        {kpiItems.map((item) => {
          const Icon = item.icon
          return (
            <div className="admin-kpi-card" key={item.key}>
              <div className={`admin-kpi-icon ${item.tone}`}><Icon size={20} /></div>
              <div className="admin-kpi-value">
                {item.value}
                {item.highlight && (
                  <span style={{ fontSize: "12px", color: "#f59e0b", marginLeft: "8px", verticalAlign: "middle" }}>
                    ● Needs Action
                  </span>
                )}
              </div>
              <div className="admin-kpi-label">{item.label}</div>
              <p className="admin-kpi-desc">{item.description}</p>
            </div>
          )
        })}
      </section>

      {/* Quick Actions Grid */}
      <section className="admin-section">
        <div className="admin-section-heading">
          <div>
            <h2 className="admin-section-title">Quick Actions</h2>
            <p className="admin-section-desc">Shortcuts to all core sections of your portfolio CMS.</p>
          </div>
        </div>
        <div className="admin-action-grid">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link href={action.href} className="admin-action-card" key={action.label}>
                <div className={`admin-action-icon ${action.tone}`}><Icon size={20} /></div>
                <div>
                  <h3>{action.label}</h3>
                  <p>{action.description}</p>
                </div>
                <ArrowRight className="admin-action-arrow" size={16} />
              </Link>
            )
          })}
        </div>
      </section>

      {/* 3-Column Dashboard Workflow Grid */}
      <section className="admin-dashboard-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        {/* Panel 1: Project Workflow */}
        <div className="admin-panel-card">
          <div className="admin-section-heading">
            <div>
              <h2 className="admin-section-title">Project Workflow</h2>
              <p className="admin-section-desc">Case studies from draft to published.</p>
            </div>
            <Link href="/admin/projects" className="admin-text-link">Manage</Link>
          </div>
          <div className="admin-status-list">
            <div className="admin-status-row"><span>Published</span><strong>{stats.publishedProjects}</strong></div>
            <div className="admin-status-row"><span>Draft</span><strong>{stats.draftProjects}</strong></div>
            <div className="admin-status-row"><span>Featured</span><strong>{stats.featuredProjects}</strong></div>
          </div>
          <div className="admin-mini-list">
            {stats.recentProjects.length > 0 ? stats.recentProjects.map((project: any) => (
              <Link key={project.id} href={`/admin/projects/${project.id}`} className="admin-mini-item">
                <span>{project.title?.en || project.slug}</span>
                {project.featured && <Star size={14} fill="currentColor" className="text-amber-500" />}
              </Link>
            )) : <p className="admin-muted">No projects yet.</p>}
          </div>
        </div>

        {/* Panel 2: Client Reviews & Testimonials */}
        <div className="admin-panel-card">
          <div className="admin-section-heading">
            <div>
              <h2 className="admin-section-title">Client Reviews</h2>
              <p className="admin-section-desc">Testimonials and private client feedback.</p>
            </div>
            <Link href="/admin/testimonials" className="admin-text-link">Moderate</Link>
          </div>
          <div className="admin-status-list">
            <div className="admin-status-row">
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Clock size={14} className="text-amber-500" /> Pending Approval
              </span>
              <strong style={{ color: stats.pendingTestimonials > 0 ? "#f59e0b" : "inherit" }}>
                {stats.pendingTestimonials}
              </strong>
            </div>
            <div className="admin-status-row">
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <CheckCircle2 size={14} className="text-emerald-500" /> Published
              </span>
              <strong>{stats.publishedTestimonials}</strong>
            </div>
            <div className="admin-status-row">
              <span>Total Reviews</span>
              <strong>{stats.totalTestimonials}</strong>
            </div>
          </div>
          <div className="admin-mini-list">
            {stats.recentTestimonials.length > 0 ? stats.recentTestimonials.map((t: any) => (
              <Link key={t.id} href="/admin/testimonials" className="admin-mini-item">
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <strong>{t.name}</strong>
                  <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>
                    ({t.role || t.company || "Client"})
                  </span>
                </span>
                <span className={`admin-badge ${t.status === "pending" ? "draft" : t.status}`}>
                  {t.status === "pending" ? "Pending" : t.status}
                </span>
              </Link>
            )) : <p className="admin-muted">No reviews submitted yet.</p>}
          </div>
        </div>

        {/* Panel 3: Inbox & Audience */}
        <div className="admin-panel-card">
          <div className="admin-section-heading">
            <div>
              <h2 className="admin-section-title">Inbox & Audience</h2>
              <p className="admin-section-desc">Inquiries, subscribers, and articles.</p>
            </div>
            <Link href="/admin/messages" className="admin-text-link">Open inbox</Link>
          </div>
          <div className="admin-status-list">
            <div className="admin-status-row"><span>New messages</span><strong>{stats.newMessages}</strong></div>
            <div className="admin-status-row"><span>Subscribers</span><strong>{stats.activeSubscribers}</strong></div>
            <div className="admin-status-row"><span>Published writing</span><strong>{stats.publishedWritings}</strong></div>
            <div className="admin-status-row"><span>Certificates</span><strong>{stats.totalCertificates}</strong></div>
          </div>
          <div className="admin-mini-list">
            {stats.recentMessages.length > 0 ? stats.recentMessages.map((message: any) => (
              <Link key={message.id} href="/admin/messages" className="admin-mini-item">
                <span>{message.subject || `Message from ${message.name}`}</span>
                <span className={`admin-badge ${message.status}`}>{message.status}</span>
              </Link>
            )) : <p className="admin-muted">Inbox is clear.</p>}
          </div>
        </div>
      </section>
    </div>
  )
}
