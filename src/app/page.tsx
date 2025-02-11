import { auth } from '~/server/auth'
import { api } from '~/trpc/server'
import Link from 'next/link'

export default async function Home() {
    const session = await auth()

    if (session?.user) {
        await api.post.getLatest.prefetch()
    }
    console.log(session?.user)
    return (
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            {session?.user && <h1>Hello {session.user.name}</h1>}
            <div>Do you want to create nice characters?</div>
            <Link
                href="/character"
                className="p-4 opacity-50 rounded-2xl border-2 border-transparent text-gray-50 hover:border-2k shadow-xl hover:opacity-100 hover:border-2 hover:border-x-white"
            >
                Character creation
            </Link>
        </div>
    )
}
