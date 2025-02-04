'use client'
import { useState } from 'react'
import { api } from '~/trpc/react'

const TestPost = () => {
    const options = [
        {
            label: 'A',
            value: 'a',
        },
        {
            label: 'B',
            value: 'b',
        },
        {
            label: 'C',
            value: 'a',
        },
        {
            label: 'A',
            value: 'a',
        },
    ]

    const [userName, setUserName] = useState<string>('')
    const [choice, setChoice] = useState<string>('')
    console.log(choice)

    const utils = api.useUtils()

    // const createUserInfos = api.userInfos.createUserInfos.useMutation({
    //     onSuccess: async () => {
    //         await utils.userInfos.invalidate()
    //         setUserName('')
    //     },
    // })

    const {
        data: userInfos,
        isLoading,
        error,
    } = api.userInfos.getUserInfos.useQuery()
    console.log(userInfos, isLoading, error)

    return (
        <div>
            <form
                className="flex flex-col gap-y-6"
                onSubmit={async (e) => {
                    e.preventDefault()
                    // createUserInfos.mutate({
                    //     userName,
                    // })
                }}
            >
                <label className="text-center">Formulaire</label>
                <input
                    type="text"
                    placeholder="Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full rounded-full px-4 py-2 text-black"
                />
                <select
                    className="w-full rounded-full px-4 py-2 text-black"
                    onChange={(e) => setChoice(e.target.value)}
                >
                    {options.map(({ label, value }, idx) => (
                        <option value={value} key={idx}>
                            {label}
                        </option>
                    ))}
                </select>
                <button
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
                    // disabled={createTestPost.isPending}
                    type="submit"
                >
                    Damned
                </button>
            </form>
        </div>
    )
}

export default TestPost
