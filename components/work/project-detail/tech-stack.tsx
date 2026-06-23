"use client"

interface TechStackProps {
  techStack: string[]
  title?: string
}

export default function TechStack({ techStack, title = "Technologies Used" }: TechStackProps) {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-2xl font-bold mb-8">{title}</h2>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
