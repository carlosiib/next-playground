import dynamic from 'next/dynamic'
import Link from 'next/link'
import { dataSchema } from "./types/types"
import { ZodError } from 'zod'
import Button from "@/components/Button"
import Item from "@/components/Item"
import Message from "@/components/Message"
const Modal = dynamic(() => import('@/components/Modal'), { ssr: false })


async function getData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    if (!res.ok || res.status !== 200) {

    }
    const body = await res.json()
    const data = dataSchema.parse(body)
    return {
      data,
      error: null,
    }

  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return { data: null, error: error.message }
    }
    if (error instanceof ZodError) {
      return { data: null, error: "Invalid data shape" }
    }
  }
}

// ssr - http://localhost:3000/?id=5&modal=true
export default async function Home({ searchParams }: { [key: string]: string | string[] | undefined }) {
  const items = await getData()

  //@ts-ignore
  const id = searchParams && (Number(searchParams['id']) || "0")
  //@ts-ignore
  const modal = searchParams && (Boolean(searchParams['modal']) || false)

  const item = items?.data?.filter(item => item.id === id)
  console.log({ item, modal })

  return (
    <>

      <main className="p-4 container border mx-auto">
        <h1>Hello next</h1>

        {/* Fetch status */}
        {items?.data?.length === 0 &&
          <Message>
            <p className="font-medium text-lg py-4 md:py-8 md:text-2xl">
              No data available
            </p>
          </Message>
        }
        {items?.error &&
          <Message>
            <p className="font-medium text-lg py-4 md:py-8 md:text-2xl">
              {items?.error}
            </p>
            <Button
              text="Contact support"
              styles="bg-black text-xl uppercase tracking-wide py-3 text-white rounded-md" />
          </Message>
        }

        {/* Data */}
        {items?.data?.length !== 0 &&
          <>
            <ul className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-12 xl:grid-cols-3'>
              {items?.data?.map((item) => <li key={item.id} className="px-2 py-4 border grid place-items-center gap-2">
                <Item item={item} />
                <Link
                  href={`/?id=${item.id}&modal=true`}
                  className='bg-slate-200 font-bold w-fit px-4 py-2 rounded-sm'>
                  View more
                </Link>
              </li>
              )}
            </ul>
            {item?.length !== 0 && modal && <Modal open={modal} item={item ? item : []} />}
          </>
        }
      </main >
    </>
  )
}
