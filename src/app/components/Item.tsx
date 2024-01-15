import { Item as ItemProp } from "../types/types";

export default function Item({ item, }: { item: ItemProp }) {
  return (
    <p><span className="font-bold">{item.id}- </span>{item.title}</p>
  )
}