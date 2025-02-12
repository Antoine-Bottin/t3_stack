import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { z } from 'zod'
export const characterRouter = createTRPCRouter({
    // Fetch all characters
    getAllCharacters: publicProcedure.query(async ({ ctx }) => {
        try {
            return await ctx.db.character.findMany({
                include: { createdBy: true },
            })
        } catch (error) {
            console.error('Error fetching userInfos:', error)
        }
    }),

    //Fetch character by id
    getCharacterById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            if (input.id) {
                try {
                    const response = await ctx.db.character.findUnique({
                        where: { id: input.id },
                    })

                    return response
                } catch (error) {
                    console.error('Error fetching userInfos:', error)
                }
            }
        }),

    //Create new character mutation
    createCharacter: protectedProcedure
        .input(
            z.object({
                name: z.string().min(1),
                age: z.number(),
                job: z.string(),
                city: z.string(),
                eyeColor: z.string(),
                presentation: z.string(),
                size: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const character = ctx.db.character.create({
                data: {
                    name: input.name,
                    age: input.age,
                    job: input.job,
                    city: input.city,
                    size: input.size,
                    eyeColor: input.eyeColor,
                    presentation: input.presentation,
                    createdBy: { connect: { id: ctx.session.user.id } },
                },
            })

            return character
        }),
})
