"use client"

interface FeaturesSectionProps {
  features: string[]
  title?: string
}

export default function FeaturesSection({ features, title = "Key Features" }: FeaturesSectionProps) {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12">{title}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed">{feature}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
