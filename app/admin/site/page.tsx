export const dynamic = "force-dynamic"

import { getSettings } from "@/lib/cms/site-settings"
import SettingsForm from "@/components/admin/settings-form"

export const metadata = {
  title: "Site & Home — Portfolio CMS",
}

export default async function AdminSitePage() {
  let settings: Record<string, any> = {}

  try {
    settings = await getSettings()
  } catch (e) {
    console.error("Error loading site settings:", e)
  }

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Configure Homepage Copy & Site Settings</h2>
        <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
          Edit structural copy variables: hero introduction, bios, email marquee parameters, and social link bindings.
        </p>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  )
}
