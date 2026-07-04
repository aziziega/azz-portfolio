export const dynamic = "force-dynamic"

import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { ArrowRight, FileText, Home, Inbox, Mail, Newspaper, Rocket, Settings, Star } from "lucide-react"

async function getStats() {
  const supabase = await createClient()
  
  const [projects, messages, subscribers, writings] = await Promise.all([
    supabase.from("projects").select("id, status, featured, title, slug, updated_at", { count: "exact" }).order("updated_at", { ascending: false }),
    supabase.from("contact_messages").select("id, status, name, subject, created_at", { count: "exact" }).order("created_at", { ascending: false }),
    supabase.from("newsletter_subscribers").select("id, status", { count: "exact" }),
    supabase.from("external_writings").select("id, status", { count: "exact" }),
  ])

  const projectData = projects.data || []
  const messageData = messages.data || []
  const subscriberData = subscribers.data || []
  const writingData = writings.data || []

  return {
    publishedProjects: projectData.filter(p => p.status === "published").length,
    draftProjects: projectData.filter(p => p.status === "draft").length,
    featuredProjects: projectData.filter(p => p.featured).length,
    newMessages: messageData.filter(m => m.status === "new").length,
    totalMessages: messageData.length,
    activeSubscribers: subscriberData.filter(s => s.status === "active").length,
    publishedWritings: writingData.filter(w => w.status === "published").length,
    hiddenWritings: writingData.filter(w => w.status === "hidden").length,
    recentProjects: projectData.slice(0, 4),
    recentMessages: messageData.slice(0, 4),
  }
}

const kpiItems = [
  {
    key: "publishedProjects",
    label: "Published Projects",
    description: "Visible on Work pages",
    icon: Rocket,
    tone: "blue",
  },
  {
    key: "draftProjects",
    label: "Draft Projects",
    description: "Waiting for polish",
    icon: FileText,
    tone: "amber",
  },
  {
    key: "newMessages",
    label: "New Messages",
    description: "Unread contact inbox",
    icon: Inbox,
    tone: "cyan",
  },
  {
    key: "activeSubscribers",
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
    href: "/admin/writing",
    label: "Blog Writing",
    description: "Sync, feature, hide, and curate external writing.",
    icon: Newspaper,
    tone: "indigo",
  },
  {
    href: "/admin/messages",
    label: "Contact Inbox",
    description: "Read visitor inquiries and mark follow-up status.",
    icon: Inbox,
    tone: "sky",
  },
  {
    href: "/admin/newsletter",
    label: "Newsletter",
    description: "Monitor subscribers and export active email list.",
    icon: Mail,
    tone: "emerald",
  },
  {
    href: "/admin/site",
    label: "Settings",
    description: "Keep SEO basics and site-level bindings updated.",
    icon: Settings,
    tone: "slate",
  },
]

export default async function AdminDashboard() {
  let stats = {
    publishedProjects: 0,
    draftProjects: 0,
    featuredProjects: 0,
    newMessages: 0,
    totalMessages: 0,
    activeSubscribers: 0,
    publishedWritings: 0,
    hiddenWritings: 0,
    recentProjects: [] as any[],
    recentMessages: [] as any[],
  }

  try {
    stats = await getStats()
  } catch (e) {
    // Tables might not exist yet — show zeros
  }

  return (
    <div className="admin-dashboard">
      <section className="admin-welcome-card">
        <div>
          <p className="admin-eyebrow">Portfolio CMS</p>
          <h2>Manage your portfolio from one clean workspace.</h2>
          <p>Update homepage copy, publish work, curate writing, and respond to visitors without touching code.</p>
        </div>
        <Link href="/" target="_blank" className="admin-btn admin-btn-primary">
          View Live Site <ArrowRight size={16} />
        </Link>
      </section>

      <section className="admin-kpi-grid">
        {kpiItems.map((item) => {
          const Icon = item.icon
          return (
            <div className="admin-kpi-card" key={item.key}>
              <div className={`admin-kpi-icon ${item.tone}`}><Icon size={20} /></div>
              <div className="admin-kpi-value">{stats[item.key as keyof typeof stats] as number}</div>
              <div className="admin-kpi-label">{item.label}</div>
              <p className="admin-kpi-desc">{item.description}</p>
            </div>
          )
        })}
      </section>

      <section className="admin-section">
        <div className="admin-section-heading">
          <div>
            <h2 className="admin-section-title">Quick Actions</h2>
            <p className="admin-section-desc">Ordered around the public landing page workflow.</p>
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

      <section className="admin-dashboard-grid">
        <div className="admin-panel-card">
          <div className="admin-section-heading">
            <div>
              <h2 className="admin-section-title">Project Workflow</h2>
              <p className="admin-section-desc">Keep case studies moving from draft to featured.</p>
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
                {project.featured && <Star size={14} fill="currentColor" />}
              </Link>
            )) : <p className="admin-muted">No projects yet.</p>}
          </div>
        </div>

        <div className="admin-panel-card">
          <div className="admin-section-heading">
            <div>
              <h2 className="admin-section-title">Inbox & Audience</h2>
              <p className="admin-section-desc">Messages, subscribers, and article visibility.</p>
            </div>
            <Link href="/admin/messages" className="admin-text-link">Open inbox</Link>
          </div>
          <div className="admin-status-list">
            <div className="admin-status-row"><span>New messages</span><strong>{stats.newMessages}</strong></div>
            <div className="admin-status-row"><span>Total messages</span><strong>{stats.totalMessages}</strong></div>
            <div className="admin-status-row"><span>Published writing</span><strong>{stats.publishedWritings}</strong></div>
            <div className="admin-status-row"><span>Hidden writing</span><strong>{stats.hiddenWritings}</strong></div>
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
