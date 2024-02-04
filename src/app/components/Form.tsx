'use client'
import { create } from "../actions";

export function Form() {
  // v2: As inline function
  return (
    <form className="flex flex-col gap-2" action={async (formData: FormData) => {
      const data = await create(formData)
      console.log(data)
      if (!data.success) {
        alert(data?.error?.email)
      }
      // revalidate path and reset form
      console.log("Form success")
    }}>
      <label className="flex flex-col gap-1">
        <span className="font-semibold">Email</span>
        <input type="email" name="email" placeholder="Enter your email" className="border p-1 rounded-md" />
      </label>
      <label className="flex gap-1">
        <input type="checkbox" name="terms" className="border p-1 rounded-md" />
        <span>Accept terms</span>
      </label>
      <input type="submit" value="Create" className="bg-black text-white p-2 font-semibold rounded-md" />
    </form>
  )
}