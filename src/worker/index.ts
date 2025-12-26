import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));
app.get("/api/test", (c) => c.json({ name: "KCD Software" }));
export default app;


