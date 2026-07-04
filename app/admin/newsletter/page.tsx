export const dynamic = "force-dynamic"

import { getSubscribers } from "@/lib/cms/newsletter"
import NewsletterList from "@/components/admin/newsletter-list"

export const metadata = {
  title: "Newsletter — Portfolio CMS",
}

export default async function AdminNewsletterPage() {
  let subscribers: any[] = []

  try {
    subscribers = await getSubscribers("all")
  } catch (e) {
    console.error("Error loading subscribers:", e)
  }

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Newsletter Subscriber List</h2>
        <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
          Monitor email newsletter registrations. Export lists for external email marketing.
        </p>
      </div>

      <NewsletterList initialSubscribers={subscribers} />
    </div>
  )
}
