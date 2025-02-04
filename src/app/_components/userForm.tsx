'use client'
import { useState } from 'react'
import { api } from '~/trpc/react'

const TestPost = () => {
    const options = [
        {
            label: 'Blue',
            value: 'blue',
        },
        {
            label: 'Brown',
            value: 'brown',
        },
        {
            label: 'Green',
            value: 'green',
        },
    ]

    const [userName, setUserName] = useState<string>('')
    const [age, setAge] = useState<number>()
    const [job, setJob] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [eyeColor, setEyeColor] = useState<string>('')
    const [presentation, setPresentation] = useState<string>('')

    const utils = api.useUtils()

    const createUserInfos = api.userInfos.createUserInfos.useMutation({
        onSuccess: async () => {
            await utils.userInfos.invalidate()
            setUserName('')
        },
    })

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
                    createUserInfos.mutate({
                        userName: userName,
                        age: age,
                        job: job,
                        city: city,
                        eyeColor: eyeColor,
                        presentation: presentation,
                    })
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
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                    onChange={(e) => setEyeColor(e.target.value)}
                >
                    <option hidden>Select your eye color</option>
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
                    Sent that form
                </button>
            </form>
        </div>
    )
}

export default TestPost
