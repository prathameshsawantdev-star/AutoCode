import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import session from "./routes/session"

const app = new Hono() 

app.get("/", (c) => c.text("Hello from the Hono server!"))

app.onError((err, c) => {
    if(err instanceof HTTPException){
        return c.json({ message: err.message || "Request failed" }, err.status)
    }

    console.error("Unhandled server error")
    return c.json({ message: "Internal server error" }, 500)

})

const router = app.route("/session", session)
export type appType = typeof router 

export default { port: 3000, fetch: app.fetch, idleTimeout: 255 }