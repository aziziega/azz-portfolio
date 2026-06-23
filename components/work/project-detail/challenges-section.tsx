"use client"

interface ChallengesSectionProps {
  challenges: string[]
  title?: string
}

export default function ChallengesSection({ challenges, title = "Challenges & Solutions" }: ChallengesSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12">{title}</h2>
        <div className="space-y-8">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center font-bold">
                  !
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed">{challenge}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
