'use client'
import Link from 'next/link'
import { useState } from 'react'
import { api } from '~/trpc/react'
import Loader from '../_components/Loader'

const Page = () => {
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

    const [name, setName] = useState<string>('')
    const [age, setAge] = useState<string>('')
    const [job, setJob] = useState<string>('')
    const [size, setSize] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [eyeColor, setEyeColor] = useState<string>('')
    const [presentation, setPresentation] = useState<string>('')

    const [isMutationLoading, setIsMutationLoading] = useState(false)

    const utils = api.useUtils()

    const createCharacter = api.character.createCharacter.useMutation({
        onSuccess: async () => {
            await utils.character.invalidate()
            setName('')
            setAge('')
            setJob('')
            setSize('')
            setCity('')
            setEyeColor('')
            setPresentation('')
            setIsMutationLoading(false)
        },
    })

    const {
        data: character,
        isLoading,
        error,
    } = api.character.getAllCharacters.useQuery()
    console.log(character, isLoading, error)

    return (
        <div>
            <form
                className="flex flex-col gap-y-6"
                onSubmit={async (e) => {
                    setIsMutationLoading(true)

                    e.preventDefault()
                    createCharacter.mutate({
                        name: name,
                        age: age ? Number(age) : 0,
                        job: job,
                        city: city,
                        eyeColor: eyeColor,
                        presentation: presentation,
                        size: size ? Number(size) : 0,
                    })
                }}
            >
                <label className="text-center border-x-2 border-t-2 rounded-t-md p-3">
                    Create New Character
                </label>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-full px-4 py-2 text-black"
                />
                <input
                    type="number"
                    placeholder="Age"
                    min={0}
                    max={110}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full rounded-full px-4 py-2 text-black"
                />
                <input
                    type="number"
                    placeholder="Size"
                    value={size}
                    step={10}
                    min={0}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full rounded-full px-4 py-2 text-black"
                />
                <input
                    type="text"
                    placeholder="Job"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                    className="w-full rounded-full px-4 py-2 text-black"
                />
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-full px-4 py-2 text-black"
                />
                <select
                    className="w-full rounded-full px-4 py-2 text-black"
                    value={eyeColor}
                    onChange={(e) => setEyeColor(e.target.value)}
                >
                    <option hidden>Select your eye color</option>
                    {options.map(({ label, value }, idx) => (
                        <option value={value} key={idx}>
                            {label}
                        </option>
                    ))}
                </select>
                <textarea
                    placeholder="Presentation"
                    value={presentation}
                    onChange={(e) => setPresentation(e.target.value)}
                    className="w-full rounded-lg px-4 py-2 text-black resize-none"
                />
                <button
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
                    type="submit"
                >
                    {isMutationLoading ? (
                        <div className="flex items-center gap-x-6">
                            <Loader />
                            Sending...
                        </div>
                    ) : (
                        <div>Send that form</div>
                    )}
                </button>
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="flex gap-x-4 flex-wrap mt-4">
                        {character?.map(({ name, id }) => {
                            return (
                                <Link
                                    className="p-2 border-x-2 rounded-md"
                                    key={id}
                                    href={`/character/${id}`}
                                >
                                    {name}
                                </Link>
                            )
                        })}
                    </div>
                )}
            </form>
        </div>
    )
}

export default Page
