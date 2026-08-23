# Issue: Admin Dashboard Overview Enhancement — Testimonials & Client Review Hub Integration

## 📌 Context & Problem Statement
The current Admin Dashboard Overview page (`/admin`) tracks Project Workflows, Contact Messages, Newsletter Subscribers, and External Writings, but lacks visibility for newly implemented core features:
1. **No Testimonials / Client Reviews Visibility**: When a client submits feedback via `/feedback?token=...`, the admin has no quick indicator on the overview page whether there are pending reviews waiting for approval.
2. **Missing Quick Actions**: Key CMS management sections (`/admin/testimonials`, `/admin/certificates`, `/admin/tech-stack`) are not linked in the Quick Actions grid.
3. **No Quick Share for Feedback URL**: The admin must navigate to `/admin/testimonials` to copy the client feedback link instead of having a 1-click copy button readily accessible from the home dashboard.

---

## 🎯 Objectives & Scope

### 1. Enhanced KPI Metrics
- Fetch `testimonials` and `certificates` count from Supabase in `getStats()`.
- Add KPI Cards:
  - **Pending Reviews**: Highlights incoming client submissions awaiting approval (with alert styling if count > 0).
  - **Published Testimonials**: Total live testimonials displayed on the landing page.
  - **Active Projects & Inquiries**: Maintained alongside new metrics.

### 2. Client Feedback Share Widget in Welcome Card
- Provide a clean, interactive **"📋 Copy Feedback Link"** button in the dashboard welcome card.
- Copies `${SITE_URL}/feedback?token=${FEEDBACK_TOKEN}` to clipboard with live toast feedback.

### 3. Complete Quick Actions Grid
- Add direct navigation cards for:
  - ⭐ **Testimonials**: Review client feedback & moderate reviews.
  - 📜 **Certificates**: Manage credentials and licenses.
  - 🛠️ **Tech Stack**: Update technical proficiencies and icons.

### 4. Dedicated "Testimonials & Client Feedback" Panel (Option 2)
- Add a 3rd bottom workflow panel:
  - **Status Counters**: `Pending Approval`, `Published Reviews`, `Private Feedback Received`.
  - **Recent Client Submissions Mini-List**: Shows latest 4 submissions with source badge (`Client` / `Admin`) and direct link to review/approve.

---

## 🛠️ Implementation Steps
1. Update `app/admin/page.tsx` server component to query `testimonials` and `certificates` in `Promise.all()`.
2. Extract client-side interactive widget for Copy Feedback Link or integrate clean component.
3. Update `kpiItems`, `quickActions`, and dashboard workflow panels.
4. Enhance `app/admin/admin.css` for new badge and card styles.
5. Verify build with `npm run build`.
