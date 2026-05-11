import { betterAuth } from "better-auth";
import { pool } from "@/lib/db";

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },
});
