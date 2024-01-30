import Link from "next/link";

export function Navigation() {
  return (
    <nav className="bg-slate-200 py-4">
      <ul className="flex justify-center align-center flex-wrap gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/form">Server action</Link>
        </li>
      </ul>
    </nav>
  )
}