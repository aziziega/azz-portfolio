"use client"

import Link from "next/link"

interface ProjectNavigationProps {
  currentSlug: string
  allSlugs: string[]
}

export default function ProjectNavigation({ currentSlug, allSlugs }: ProjectNavigationProps) {
  const currentIndex = allSlugs.indexOf(currentSlug)
  const previousSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null

  return (
    <section className="py-16 border-t border-gray-200">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          {/* Back to Work */}
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors font-medium"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to All Projects
          </Link>

          {/* Next/Previous Navigation */}
          <div className="flex gap-4">
            {previousSlug && (
              <Link
                href={`/work/${previousSlug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-black font-medium rounded-full transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Previous
              </Link>
            )}
            {nextSlug && (
              <Link
                href={`/work/${nextSlug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 text-white font-medium rounded-full transition-colors"
              >
                Next
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
