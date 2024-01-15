import { twMerge } from "tailwind-merge";

interface MessageProps {
  children?: React.ReactNode,
  styles?: string,
}

export default function Message({ children, styles }: MessageProps) {
  return (
    <div className={twMerge("px-2 min-h-[150px] grid place-items-center gap-2", styles)}>
      {children ?? null}
    </div>
  )
}