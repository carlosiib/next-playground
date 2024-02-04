import { Form as FormCreate } from "@/components/Form"

export default function Form() {

  return (
    <div className="container mx-auto gap-2 max-w-sm ">
      <h1 className="text-md font-bold">Server Action</h1>
      <FormCreate />
    </div>
  )
}