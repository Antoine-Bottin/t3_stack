'use client'

import { api } from '~/trpc/react'
import { use } from 'react'

const CharacterDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params)

    const { data, isLoading, error } = api.character.getCharacterById.useQuery({
        id,
    })

    console.log(data, isLoading, error)

    // if (isLoading) return <div>Loading...</div>
    // if (error) return <div>Error: {error.message}</div>
    // if (!data) return <div>No data</div>

    return (
        <div>
            {id}
            {/* <h1>{data?.name}</h1> */}
        </div>
    )
}

export default CharacterDetail
