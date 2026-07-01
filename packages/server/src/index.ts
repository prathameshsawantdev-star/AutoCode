import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import session from "./routes/session"
import { sentry } from "@sentry/hono/bun";
import * as Sentry from "@sentry/hono/bun";

const app = new Hono() 

app.use(
  sentry(app, {
    dsn: "https://e1ef6c23f8a81301c5334310caeb4a63@o4511661150633984.ingest.de.sentry.io/4511661166231632",
    tracesSampleRate: 1.0,
    enableLogs: true,
    dataCollection: {
      // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
      // https://docs.sentry.io/platforms/javascript/guides/hono/configuration/options/#dataCollection
      // userInfo: false,
      // httpBodies: [],
    },
  }),
);

app.get("/debug-sentry", () => {
  // Send a log before throwing the error
  Sentry.logger.info('User triggered test error', {
    action: 'test_error_endpoint',
  });
  // Send a test metric before throwing the error
  Sentry.metrics.count('test_counter', 1);
  throw new Error("My first Sentry error!");
});

app.onError((err, c) => {
    if(err instanceof HTTPException){
       Sentry.logger.warn("Handled HTTP error", {
        status: err.status, 
        message: err.message || "Request Failed",
        path: c.req.path,
        method: c.req.method
       })
    }

    return c.json({ message: "Internal server error" }, 500)

})

const router = app.route("/sessions", session)
export type AppType = typeof router 

export default { port: 3000, fetch: app.fetch, idleTimeout: 255 }