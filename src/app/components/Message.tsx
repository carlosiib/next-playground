import { twMerge } from "tailwind-merge";

interface MessageProps {
  children?: React.ReactNode,
  classes?: string,
  type?: 'alert' | 'warning'
}

export default function Message({ children, classes, type }: MessageProps) {
  const styleType = {
    alert: 'bg-red-200',
    warning: 'bg-yellow-200',
  }

  return (
    <div className={twMerge("px-2 min-h-[150px] grid place-items-center gap-2",
      type && (styleType?.[type] ?? ''), classes)}>
      {children ?? null}
    </div>
  )
}