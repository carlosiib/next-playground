'use client'

import { useEffect, useState } from "react"
import { dataSchema, type Data } from "./types/types"
import { ZodError } from 'zod'
import Button from "@/components/Button"
import Item from "@/components/Item"
import Modal from "@/components/Modal"
import Message from "@/components/Message"

const ITEMS_MOCKUP = [{ id: 1, title: "foo1", body: "my body", userId: 11 }, { id: 2, title: "foo2", body: "my body2", userId: 11 }, { id: 3, title: "fo3", body: "my bod3", userId: 11 }]
// const items = []

// TODO: FETCH MODAL DATA FROM itemId M


export default function Home() {
  // console.log({ items })

  const [open, setOpen] = useState(false)
  const [itemID, setItemID] = useState(0)
  const [items, setItems] = useState<Data>()
  const [error, setError] = useState({ display: false, message: "Something went wrong" })

  // TODO: state for loading and error

  useEffect(() => {
    let isMounted = false
    async function getData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts")
        if (!res.ok || res.status !== 200) {
          setError({ display: true, message: "Fetching data failed" })
        }
        const body = await res.json()
        const data = dataSchema.parse(body)

        if (!isMounted) {
          console.log(data)
          setItems(data)
        }
      } catch (error) {

        console.log(error)
        if (error instanceof Error) {
          setError({ display: true, message: error.message })
        }
        if (error instanceof ZodError) {
          setError({ display: true, message: "Invalid data shape" })
        }
      }
    }
    getData()
    // Prevent race conditions
    return () => { isMounted = true }
  }, [])

  // derived state
  const item = items?.filter(item => item.id === itemID)

  return (
    <>

      <main className="p-4 container border mx-auto">
        <h1>Hello next</h1>

        {/* Fetch status */}
        {items?.length == 0 &&
          <Message>
            <p className="font-medium  text-lg py-4 md:py-8 md:text-2xl">
              No data available
            </p>
          </Message>
        }
        {error.display &&
          <Message>
            <p className="font-medium  text-lg py-4 md:py-8 md:text-2xl">
              {error.message}
            </p>
            <Button
              text="Contact support"
              onClick={() => alert("Contact support feature")}
              styles="bg-black text-xl uppercase tracking-wide py-3 text-white rounded-md" />
          </Message>
        }

        {/* Data */}
        {items?.length !== 0 &&
          <>
            <ul className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-12 xl:grid-cols-3'>
              {items?.map((item) => <li key={item.id} className="px-2 py-4 border grid place-items-center gap-2">
                <Item item={item} />
                <Button
                  itemId={item.id}
                  handleModal={(value) => setOpen(value)}
                  handleId={(id) => setItemID(id)}>
                  View More
                </Button>
              </li>
              )}
            </ul>
            <Modal open={open} handleModal={(value) => setOpen(value)} item={item ? item : []} />
          </>
        }
      </main >
    </>
  )
}
