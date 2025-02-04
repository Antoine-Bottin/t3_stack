'use client'
import { useState } from 'react'
import { api } from '~/trpc/react'

const TestPost = () => {
    // const options = [
    //     {
    //         label: 'A',
    //         value: 'a',
    //     },
    //     {
    //         label: 'B',
    //         value: 'b',
    //     },
    //     {
    //         label: 'C',
    //         value: 'a',
    //     },
    //     {
    //         label: 'A',
    //         value: 'a',
    //     },
    // ]

    const [text, setText] = useState<string>('')

    const utils = api.useUtils()

    const createTestPost = api.dummy.createTestPost.useMutation({
        onSuccess: async () => {
            await utils.dummy.invalidate()
            setText('')
        },
    })

    return (
        <div>
            <h1>TEST</h1>
            <form
                onSubmit={async (e) => {
                    e.preventDefault()
                    createTestPost.mutate({
                        text: text,
                    })
                }}
            >
                <input
                    type="text"
                    placeholder="Title"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full rounded-full px-4 py-2 text-black"
                />
                <button
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
                    disabled={createTestPost.isPending}
                    type="submit"
                >
                    Damned
                </button>
            </form>
        </div>
    )
}

export default TestPost
