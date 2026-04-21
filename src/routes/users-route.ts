import { Elysia, t } from "elysia";
import { registerUser, EmailAlreadyExistsError } from "../services/users-service";

export const usersRoute = new Elysia({ prefix: "/users" })
  .post(
    "/",
    async ({ body, set }) => {
      try {
        return await registerUser(body);
      } catch (err) {
        if (err instanceof EmailAlreadyExistsError) {
          set.status = 400;
          return { error: err.message };
        }
        throw err;
      }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1 }),
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 1 }),
      }),
    }
  );
