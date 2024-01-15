'use client'
import { useState } from "react"
import { Item } from "../types/types"
import { twMerge } from "tailwind-merge"

async function getData(id: number) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    if (!res.ok || res.status !== 200) {
      throw new Error("Fetching data failed")
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}


interface ButtonProps {
  children?: React.ReactNode,
  itemId?: number,
  text?: string,
  styles?: string,
  handleModal?: (value: boolean) => void,
  handleId?: (id: number) => void,
  onClick?: () => void,
}

export default function Button({ children, handleModal, handleId, onClick, itemId, styles, text = "Button", ...rest }: ButtonProps) {
  function handleClick() {
    if (typeof handleModal === "function") {
      handleModal(true)
    }
    if (typeof handleId === "function" && itemId) {
      // console.log("itemid", itemId)
      handleId(itemId)
    }
  }

  return (
    <button
      onClick={handleModal ? handleClick : onClick}
      className={twMerge("bg-slate-200 font-bold w-fit px-4 py-2 rounded-sm", styles)}
      {...rest}>
      {children ?? text}
    </button>
  )
}