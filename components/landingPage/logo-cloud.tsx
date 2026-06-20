import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

export const LogoCloud = () => {
    return (
        <section className="bg-background pb-16 md:pb-32">
            <div className="group relative m-auto max-w-6xl px-6">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="inline md:max-w-44 md:border-r md:pr-6">
                        <p className="text-end text-sm">Powering the best teams</p>
                    </div>
                    <div className="**:fill-foreground relative py-6 md:w-[calc(100%-11rem)]">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={112}>
                            <img
                                className="h-6 w-auto"
                                src="https://cdn.simpleicons.org/bolt/000000"
                                alt="Bolt"
                            />
                            <img
                                className="h-6 w-auto dark:invert"
                                src="https://cdn.simpleicons.org/vercel/000000"
                                alt="Vercel"
                            />
                            <img
                                className="h-6 w-auto"
                                src="https://cdn.simpleicons.org/supabase/3FCF8E"
                                alt="Supabase"
                            />
                            <img
                                className="h-5 w-auto"
                                src="https://cdn.simpleicons.org/hulu/1CE783"
                                alt="Hulu"
                            />
                            <img
                                className="h-6 w-auto"
                                src="https://cdn.simpleicons.org/spotify/1DB954"
                                alt="Spotify"
                            />
                            <img
                                className="h-6 w-auto"
                                src="https://cdn.simpleicons.org/firebase/FFCA28"
                                alt="Firebase"
                            />
                            <img
                                className="h-6 w-auto"
                                src="https://cdn.simpleicons.org/beacon/4A90E2"
                                alt="Beacon"
                            />
                            <img
                                className="h-7 w-auto"
                                src="https://cdn.simpleicons.org/anthropic/000000"
                                alt="Claude"
                            />
                            <img
                                className="h-6 w-auto"
                                src="https://cdn.simpleicons.org/figma/F24E1E"
                                alt="Figma"
                            />
                            <img
                                className="h-8 w-auto"
                                src="https://cdn.simpleicons.org/cisco/1BA0D7"
                                alt="Cisco"
                            />
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
            </div>
        </section>
    )
}