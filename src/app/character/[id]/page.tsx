'use client'

import { api } from '~/trpc/react'
import { use } from 'react'
import Loader from '~/app/_components/Loader'
import { useRouter } from 'next/navigation'

const CharacterDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params)

    const router = useRouter()

    const utils = api.useUtils()

    const {
        data: character,
        isLoading,
        error,
    } = api.character.getCharacterById.useQuery({
        id,
    })

    const handleRemoveCharacter = async () => {
        await removeCharacter.mutateAsync({ id })
        await utils.character.invalidate()
        router.push('/character')
    }

    const removeCharacter = api.character.removeCharacter.useMutation()

    if (isLoading) return <Loader />
    if (error) return <div>Error: {error.message}</div>
    if (!character) return <div>No data</div>

    const { name, size, eyeColor, city, presentation, job, age } = character

    return (
        <div className="border-purple-400 border-2 p-8 rounded-xl flex flex-col gap-y-2 relative ">
            <div
                className="absolute top-2 right-2 border-purple-400 border-2 rounded-full cursor-pointer h-6 w-6 flex items-center justify-center"
                onClick={handleRemoveCharacter}
            >
                x
            </div>
            <div>Name: {name}</div>
            <div>{size}</div>
            <div>{eyeColor}</div>
            <div>{city}</div>
            <div>{presentation}</div>
            <div>{job}</div>
            <div>{age}</div>
        </div>
    )
}

export default CharacterDetail
