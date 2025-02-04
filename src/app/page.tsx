import { auth } from '~/server/auth'
import { api, HydrateClient } from '~/trpc/server'
import TestPost from './_components/userForm'

export default async function Home() {
    // const hello = await api.post.hello({ text: 'from tRPC' })

    // const dummySentence = await api.userInfos.test({
    //     text: 'Antoine Bottin',
    // })

    // console.log('=============>', dummySentence)

    const session = await auth()

    if (session?.user) {
        void api.post.getLatest.prefetch()
    }

    return (
        <HydrateClient>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                    {session?.user && (
                        <>
                            {/* <LatestPost /> */}
                            <TestPost />
                        </>
                    )}
                </div>
            </main>
        </HydrateClient>
    )
}
