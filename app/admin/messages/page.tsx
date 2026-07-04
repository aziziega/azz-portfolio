export const dynamic = "force-dynamic"

import { getMessages } from "@/lib/cms/messages"
import MessagesView from "@/components/admin/messages-view"

export const metadata = {
  title: "Contact Inbox — Portfolio CMS",
}

export default async function AdminMessagesPage() {
  let messages: any[] = []

  try {
    messages = await getMessages("all")
  } catch (e) {
    console.error("Error loading messages:", e)
  }

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Contact Messages Inbox</h2>
        <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
          Read, archive, or reply to queries submitted by visitors via the public website contact form.
        </p>
      </div>

      <MessagesView initialMessages={messages} />
    </div>
  )
}
