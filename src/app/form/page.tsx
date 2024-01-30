import { revalidatePath } from 'next/cache'
import { z } from "zod"


const formSchema = z.object({
  email: z.string().email().trim()
})
type Form = z.infer<typeof formSchema>

export default function Form() {

  async function create(formData: FormData) {
    'use server'

    const email = formData.get("email")
    const parse = formSchema.safeParse({ email })

    if (!parse.success) {
      return { errors: parse.error.flatten().fieldErrors, };
    }

    const { data } = parse
    console.log("z", data)

    try {
      // post into db
      // revalidatePath('/form')

      return { message: `Added` };
    } catch (e) {
      return { message: "Failed " };
    }

  }

  return (
    <div className="container mx-auto gap-2 max-w-sm ">
      <h1 className="text-md font-bold">Server Action</h1>
      <form className="flex flex-col gap-2" action={create}>
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Email</span>
          <input type="email" name="email" placeholder="Enter your email" className="border p-1 rounded-md" />
        </label>
        <input type="submit" value="Send" className="bg-black text-white p-2 font-semibold rounded-md" />
      </form>
    </div>
  )
}