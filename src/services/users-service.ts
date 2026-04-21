import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

export class EmailAlreadyExistsError extends Error {
  constructor() {
    super("Email sudah terdaftar");
  }
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.email, input.email));

  if (existing) {
    throw new EmailAlreadyExistsError();
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);

  await db.insert(users).values({
    name: input.name,
    email: input.email,
    password: hashedPassword,
  });

  return { data: "ok" };
}
