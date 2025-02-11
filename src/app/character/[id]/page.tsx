import { api } from '~/trpc/server'

const CharacterDetail = ({ params }: { params: { id: string } }) => {
    const { id } = params
    const { data, isLoading, error } = api.character.getCharacterById.useQuery({
        id,
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!data) return <div>No data</div>

    return (
        <div>
            <h1>{data.name}</h1>
        </div>
    )
}

export default CharacterDetail
