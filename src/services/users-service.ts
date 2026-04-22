import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users, sessions } from "../db/schema";

export class EmailAlreadyExistsError extends Error {
  constructor() {
    super("Email sudah terdaftar");
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super("email atau password salah");
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

export async function loginUser(input: { email: string; password: string }) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, input.email));

  if (!user) {
    throw new InvalidCredentialsError();
  }

  const passwordMatch = await bcrypt.compare(input.password, user.password);
  if (!passwordMatch) {
    throw new InvalidCredentialsError();
  }

  const token = crypto.randomUUID();

  await db.insert(sessions).values({ token, userId: user.id });

  return { data: token };
}
