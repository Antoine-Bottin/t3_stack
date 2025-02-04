import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { z } from 'zod'

export const dummyRouter = createTRPCRouter({
    dummySentence: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                dummySentence: `Hello ${input.text}`,
            }
        }),
    createTestPost: protectedProcedure
        .input(z.object({ text: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.testPost.create({
                data: {
                    text: input.text,
                    createdBy: { connect: { id: ctx.session.user.id } },
                },
            })
        }),
})
