import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Thoughts & Tutorials | Azizi E.M.",
  description: "Technical articles, tutorials, and insights about web development, fullstack engineering, and software best practices.",
  openGraph: {
    title: "Blog - Thoughts & Tutorials | Azizi E.M.",
    description: "Technical articles, tutorials, and insights about web development, fullstack engineering, and software best practices.",
    type: "website",
  },
}

export default function BlogPage() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="pt-40 pb-20">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Blog & Insights
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Technical articles, tutorials, and thoughts about web development, 
                fullstack engineering, design patterns, and software best practices. 
                Coming soon!
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="pb-20">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="p-12 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-6xl mb-4">📝</div>
                <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
                <p className="text-gray-600 mb-6">
                  I'm currently working on creating quality content for this blog. 
                  Stay tuned for articles about Next.js, React, TypeScript, system design, 
                  and fullstack development.
                </p>
                <a 
                  href="/#contact" 
                  className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Get Notified
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
