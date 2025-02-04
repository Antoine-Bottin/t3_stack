import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { z } from 'zod'
export const userInfosRouter = createTRPCRouter({
    // 🔹 Fetch all UserInfos
    getUserInfos: publicProcedure.query(async ({ ctx }) => {
        try {
            return await ctx.db.userInfos.findMany({
                include: { createdBy: true },
            })
        } catch (error) {
            console.error('Error fetching userInfos:', error)
        }
    }),
    createUserInfos: protectedProcedure
        .input(z.object({ userName: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.testPost.create({
                data: {
                    userName: input.userName,
                    createdBy: { connect: { id: ctx.session.user.id } },
                },
            })
        }),
})
