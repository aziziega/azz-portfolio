import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { useLanguage } from '@/contexts/language-contexts'

export default function TechStack() {
    const { t } = useLanguage()
    return (
        <section className="bg-background overflow-hidden py-16">
            <div className="group relative">
                <div className="flex flex-col items-center">
                    <div className="text-center mb-8">
                        <h2 className="section-title">{t("techStack.title")}</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            {t("techStack.subtitle")}
                        </p>
                    </div>
                    <div className="relative py-6 w-full max-w-5xl">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={160}>
                            <div className="flex">
                                <img
                                    className="mx-auto h-12 w-fit"
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                                    alt="React"
                                    height="48"
                                    width="auto"
                                />
                            </div>

                            <div className="flex">
                                <img
                                    className="mx-auto h-12 w-fit dark:invert"
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
                                    alt="Next.js"
                                    height="48"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-12 w-fit"
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                                    alt="TypeScript"
                                    height="48"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-12 w-fit"
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
                                    alt="Tailwind CSS"
                                    height="48"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-12 w-fit"
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                                    alt="Node.js"
                                    height="48"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-12 w-fit"
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                                    alt="Python"
                                    height="48"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-12 w-fit"
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
                                    alt="PostgreSQL"
                                    height="48"
                                    width="auto"
                                />
                            </div>

                            <div className="flex">
                                <img
                                    className="mx-auto h-12 w-fit"
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
                                    alt="Git"
                                    height="48"
                                    width="auto"
                                />
                            </div>
                        </InfiniteSlider>

                        <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                        <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div >
        </section >
    )
}