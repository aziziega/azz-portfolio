import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

export default function TechStack() {
    return (
        <section className="bg-background py-16 md:py-32">
            <div className="group relative m-auto max-w-6xl px-6">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="inline md:max-w-44 md:border-r md:pr-6">
                        <p className="text-end text-sm">Technologies I use</p>
                    </div>
                    <div className="relative py-6 md:w-[calc(100%-11rem)]">
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

                        <div
                            aria-hidden
                            className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"
                        />
                        <div
                            aria-hidden
                            className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"
                        />
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