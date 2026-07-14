export const dynamic = "force-dynamic"

import { getWritings } from "@/lib/cms/writings"
import { getSettingByKey } from "@/lib/cms/site-settings"
import WritingsList from "@/components/admin/writings-list"

export const metadata = {
  title: "Blog Writing — Portfolio CMS",
}

export default async function AdminWritingPage() {
  let writings: any[] = []
  let mediumUsername = "@aziziegatrimuthi16_89459"

  try {
    writings = await getWritings("all")
    mediumUsername = await getSettingByKey("medium_username") || "@aziziegatrimuthi16_89459"
  } catch (e) {
    console.error("Error loading writings:", e)
  }

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Manage External Writing (Medium Feed)</h2>
        <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
          Synchronize articles from your Medium account. Hide individual items, toggle features, or preview.
        </p>
      </div>

      <WritingsList initialWritings={writings} initialUsername={mediumUsername} />
    </div>
  )
}
