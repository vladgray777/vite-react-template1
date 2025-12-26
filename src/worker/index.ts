import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.get("/api/questions", async (c) => {
  const data = await c.env.KV.get("n400", { type: "json" });

  if (!data) {
    return c.json({ error: "Questions not found" }, 404);
  }

  return c.json(data);
});
// app.get("/api/test", (c) => c.json({ name: "KCD Software" }));
export default app;


