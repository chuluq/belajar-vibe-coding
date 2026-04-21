import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { usersRoute } from "./routes/users-route";

const app = new Elysia()
  .use(cors())
  .get("/health", () => ({ status: "ok" }))
  .group("/api", (app) => app.use(usersRoute))
  .listen(process.env.PORT ?? 3000);

console.log(`Server running at http://localhost:${app.server?.port}`);
