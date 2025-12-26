import { Hono } from "hono";

export interface Env {
  KV: KVNamespace;
}

const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.get("/api/questions", async (c) => {
  const questions = await c.env.KV.get("n400", { type: "json" });

  if (!questions) {
    return c.json({ error: "Questions not found" }, 404);
  }

  return c.json(questions);
});

// 🔥 THIS IS CRITICAL
export default {
  fetch: app.fetch,
};
