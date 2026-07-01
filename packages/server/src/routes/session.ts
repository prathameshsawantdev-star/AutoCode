import z from "zod"
import { findSupportedChatModel } from "@autocode/shared"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import { Mode, Role,  MessageStatus } from "@autocode/database/enums"
import { db } from "@autocode/database"
import * as Sentry from "@sentry/hono/bun"

type MockMessage = {
    id: string,
    role: string,
    content: string,
    mode: string,
    model: string, 
    status: string,
    parts: null,
    duration: null,
    createdAt: string,
    sessionId: string
}

type MockSession = {
    id: string,
    title: string,
    cwd: string | null,
    userId: string,
    createdAt: string
    messages: MockMessage[]
}

const sessions: MockSession[] = [];
let nextId = 1;

const createSessionSchema = z.object({
    title: z.string(),
    cwd: z.string().optional(),
    initialMessage: z
    .object({
        role: z.enum(Role),
        content: z.string(),
        mode: z.enum(Mode),
        model: z.string()
            .refine((modelId) => !!findSupportedChatModel(modelId), {
                message: "Unsupported chat model"
            })
    }),
})

const createSessionValidator = zValidator("json", createSessionSchema, (result, c) => {
    if (!result.success) {
        Sentry.logger.warn("Session Creation Validation failed", {
            path: c.req.path,
            issues: result.error.issues.length
        })

        c.json({ message: "Invalid request body", errors: result.error.message }, 400)
    }
})

const app = new Hono()
.get("/", async (c) => {
    const sessions = await db.session.findMany({
        orderBy: { createdAt: "desc"},
        select: {
            id: true,
            title: true, 
            createdAt: true 
        }
    })

    return c.json(sessions) 
})
.get("/:id", async (c) => {
    // MOCK: Uncomment to simulate slow session loading 
    //await new Promise((r) => setTimeout(r, 5000))

    // MOCK: Uncomment to simulate session loading error 
    ///throw new HTTPException(500, { message: "Mock error: session loading failed" })

    const id = c.req.param("id")
    const session = await db.session.findUnique({
        where: { id: id },
        include: {
            messages: { orderBy: { createdAt: "asc" }}
        }
    })

    if (!session){
        Sentry.logger.warn("Session not found", {
            sessionId: id 
        })
        return c.json({ error: "Session not found"}, 404)
    }

    return c.json(session)
}) 
.post("/", createSessionValidator, async (c) => {
// MOCK: Uncomment to simulate slow session loading 
    //await new Promise((r) => setTimeout(r, 5000))

    // MOCK: Uncomment to simulate session loading error 
    ///throw new HTTPException(500, { message: "Mock error: session loading failed" })
  
    const { initialMessage, ...data } = c.req.valid("json")

    const session = await db.session.create({
        data: {
            ...data, 
            userId: "mock-user",
            ...(initialMessage && {
                messages: {
                    create: {
                        ...initialMessage, 
                        status: MessageStatus.COMPLETE
                    }
                },
            })
        },
        include: { messages: true }
    })

    return c.json(session, 201)
})

export default app;