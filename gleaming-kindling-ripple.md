# Plan: Stacked List Layout with Geometric Background for /work Page

## Context

User wants to redesign the `/work` page with a new layout approach. Currently, the page uses a hybrid layout with:
- Hero section with gradient background
- Bento grid for featured projects (2 featured projects)
- Regular grid for non-featured projects (2 non-featured projects)

The user selected **Option D: Stacked List + Geometric Background**, which features:
- Clean vertical list layout (full-width items)
- Each project as a numbered row with title, tags, and image preview
- Subtle geometric shapes in background (circles/lines)
- Minimalist agency-style aesthetic
- Hover state that reveals image preview or expands inline

This approach will create a more editorial, portfolio-focused experience that's easier to scan.

## Project Data Structure

From exploration, we have 4 total projects:
- **Featured (2)**: GymFlow, MediCore
- **Non-featured (2)**: FinanceTrack, UniCMS

Each Project has:
- Basic: `slug`, `title`, `tagline`, `category`, `year`, `tags`, `techStack`
- Visual: `thumbnail`, `images`
- Links: `liveUrl`, `githubUrl` (optional)
- Metadata: `featured`, `order`

## Implementation Plan

### 1. Create New CSS File for Stacked List Layout

**File**: `app/work-list.css`

Will include:
- Hero section with geometric background shapes (SVG patterns or pseudo-elements)
- Stacked list container with numbered items
- Each list item: number → title → tags → hover image preview
- Hover states with smooth transitions
- Geometric background elements (floating circles, subtle lines)
- Responsive design for mobile/tablet

Design specifics:
- Background: white/light with subtle geometric SVG patterns
- Typography: Large numbers (01, 02, etc.), clean sans-serif titles
- Hover effect: Image slides in from right or fades in as overlay
- Borders: Thin dividers between items
- Spacing: Generous padding for breathing room

### 2. Create New Project List Item Component

**File**: `components/work/project-list-item.tsx`

Props:
```typescript
interface ProjectListItemProps {
  project: Project
  index: number
}
```

Features:
- Display project number (formatted as "01", "02", etc.)
- Project title with link to detail page
- Category badge and year
- Tech stack tags (show 3-4 main ones)
- Thumbnail image that appears on hover
- External link icons if liveUrl/githubUrl exist
- Smooth hover animations

### 3. Update Work Page Component

**File**: `app/work/page.tsx`

Changes:
- Replace bento grid and regular grid sections
- Use single unified list for ALL projects (featured + non-featured)
- Sort by order field to maintain priority
- Import and use new CSS file
- Update hero section with new background styling
- Map projects to new ProjectListItem component

Layout structure:
```
<main className="work-list-main">
  {/* Hero with geometric background */}
  <section className="work-list-hero">
    <div className="geometric-bg">
      {/* SVG shapes or CSS pseudo-elements */}
    </div>
    <h1>Selected Works</h1>
    <p>Subtitle...</p>
  </section>

  {/* Stacked list of all projects */}
  <section className="work-list-section">
    <div className="work-list-container">
      {allProjects.map((project, index) => (
        <ProjectListItem project={project} index={index} />
      ))}
    </div>
  </section>

  {/* CTA section (keep existing) */}
  <section className="work-cta-section">
    ...
  </section>
</main>
```

### 4. Import New CSS in Global Styles

**File**: `app/globals.css`

Add import:
```css
@import './work-list.css';
```

### 5. Optional: Add Featured Badge

Even in list layout, we can subtly distinguish featured projects:
- Small "Featured" badge next to the number
- Different background color on hover
- Highlighted border

## Files to Create/Modify

**New files:**
1. `app/work-list.css` - Complete styling for new layout
2. `components/work/project-list-item.tsx` - List item component

**Modified files:**
1. `app/work/page.tsx` - Replace layout sections with new structure
2. `app/globals.css` - Import new CSS file

**Preserved files:**
- Keep `components/work/project-card.tsx` (might be used elsewhere)
- Keep `app/bento.css` (might be used elsewhere or for future)
- Keep project detail pages unchanged

## Verification Steps

1. **Visual Check**:
   - Run `npm run dev` and navigate to `/work`
   - Verify hero section displays with geometric background shapes
   - Check that all 4 projects appear in numbered list (01-04)
   - Confirm project order follows the data order field

2. **Interaction Check**:
   - Hover over each list item - image preview should appear smoothly
   - Click project title - should navigate to detail page
   - Click external link icons - should open in new tab
   - Test on mobile - list should remain readable and functional

3. **Responsive Check**:
   - Test on desktop (1920px)
   - Test on tablet (768px)
   - Test on mobile (375px)
   - Verify geometric shapes scale/hide appropriately

4. **Cross-browser**:
   - Test in Chrome, Firefox, Safari
   - Verify hover effects work consistently

## Design Notes

**Color scheme:**
- Background: `#ffffff` or `#fafafa`
- Text: `#1a1a1a` (primary), `#666666` (secondary)
- Accent: `#000000` or `#2563eb` (for hover states)
- Geometric shapes: Very light gray or colored with low opacity

**Typography:**
- Numbers: Large (4-5rem), bold, light gray
- Titles: 2-3rem, bold, black
- Tags: Small (0.875rem), medium weight

**Hover behavior:**
- Image fades in from 0 to 1 opacity over 300-400ms
- Image can slide in from right or scale from center
- Border/background color subtle change
- Cursor changes to pointer

**Geometric elements:**
- 3-5 circles of varying sizes scattered in background
- Optional: diagonal lines or grid patterns
- Very subtle, shouldn't distract from content
- Use SVG or CSS shapes with low opacity
