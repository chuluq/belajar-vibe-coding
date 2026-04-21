import { Elysia, t } from "elysia";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const usersRoute = new Elysia({ prefix: "/users" })
  .get("/", async () => {
    return db.select().from(users);
  })
  .get("/:id", async ({ params, set }) => {
    const [user] = await db.select().from(users).where(eq(users.id, params.id));
    if (!user) {
      set.status = 404;
      return { message: "User not found" };
    }
    return user;
  }, {
    params: t.Object({ id: t.Numeric() }),
  })
  .post("/", async ({ body, set }) => {
    const [result] = await db.insert(users).values(body);
    set.status = 201;
    return { id: result.insertId, ...body };
  }, {
    body: t.Object({
      name: t.String({ minLength: 1 }),
      email: t.String({ format: "email" }),
    }),
  })
  .put("/:id", async ({ params, body, set }) => {
    const [existing] = await db.select().from(users).where(eq(users.id, params.id));
    if (!existing) {
      set.status = 404;
      return { message: "User not found" };
    }
    await db.update(users).set(body).where(eq(users.id, params.id));
    return { id: params.id, ...body };
  }, {
    params: t.Object({ id: t.Numeric() }),
    body: t.Object({
      name: t.Optional(t.String({ minLength: 1 })),
      email: t.Optional(t.String({ format: "email" })),
    }),
  })
  .delete("/:id", async ({ params, set }) => {
    const [existing] = await db.select().from(users).where(eq(users.id, params.id));
    if (!existing) {
      set.status = 404;
      return { message: "User not found" };
    }
    await db.delete(users).where(eq(users.id, params.id));
    return { message: "User deleted" };
  }, {
    params: t.Object({ id: t.Numeric() }),
  });
