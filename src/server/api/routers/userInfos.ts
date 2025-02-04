import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { z } from 'zod'
export const userInfosRouter = createTRPCRouter({
    // Fetch all UserInfos
    getUserInfos: publicProcedure.query(async ({ ctx }) => {
        try {
            return await ctx.db.userInfos.findMany({
                include: { createdBy: true },
            })
        } catch (error) {
            console.error('Error fetching userInfos:', error)
        }
    }),
    //Create new user infos mutation
    createUserInfos: protectedProcedure
        .input(
            z.object({
                userName: z.string().min(1),
                age: z.number().optional(),
                job: z.string().optional(),
                city: z.string().optional(),
                eyeColor: z.string().optional(),
                presentation: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.userInfos.create({
                data: {
                    userName: input.userName,
                    age: input.age,
                    job: input.job,
                    city: input.city,
                    eyeColor: input.eyeColor,
                    presentation: input.presentation,
                    createdBy: { connect: { id: ctx.session.user.id } },
                },
            })
        }),
})
