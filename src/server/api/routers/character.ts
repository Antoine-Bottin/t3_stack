import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { z } from 'zod'
export const characterRouter = createTRPCRouter({
    // Fetch all UserInfos
    getCharacter: publicProcedure.query(async ({ ctx }) => {
        try {
            return await ctx.db.character.findMany({
                include: { createdBy: true },
            })
        } catch (error) {
            console.error('Error fetching userInfos:', error)
        }
    }),
    //Create new user infos mutation
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
            return ctx.db.character.create({
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
        }),
})
