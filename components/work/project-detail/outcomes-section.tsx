"use client"

interface OutcomesSectionProps {
  outcomes: string[]
  title?: string
}

export default function OutcomesSection({ outcomes, title = "Results & Impact" }: OutcomesSectionProps) {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12">{title}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {outcomes.map((outcome, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium leading-relaxed">{outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
