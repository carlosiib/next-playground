"use server";

import { ZodError, z } from "zod";

const formSchema = z.object({
  email: z.string().email().trim(),
  terms: z.coerce.boolean(),
});
type Form = z.infer<typeof formSchema>;

// form validation
export async function create(formData: FormData) {
  const email = formData.get("email");
  const terms = formData.get("terms");
  const parse = formSchema.safeParse({ email, terms });

  if (!parse.success) {
    return {
      success: false,
      error: parse.error.flatten().fieldErrors,
    };
  }

  const { data } = parse;

  try {
    // post into db
    return { success: true, data, message: `Added` };
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        success: false,
        data: null,
        message: "Failed zod validation",
      };
    }
    return {
      success: false,
      data: null,
      message: "Failed ",
    };
  }
}
