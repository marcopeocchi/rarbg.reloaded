'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef } from "react"

type Props = {
  route: string
  pages: number
}

export default function Paginator({ pages, route }: Props) {
  const pagesRef = useRef([...Array(pages).keys()]
    .filter((_, i, a) => i <= 3 || i > (a.length - 3))
    .map(e => String(e + 1))
    .map((e, i) => i === 3 ? '...' : e))

  const path = usePathname()
  const active = useRef(Number(path.split('/').pop()) || 1)

  return (
    <div className="flex justify-center py-2">
      <div className="join">
        <Link href={`search/${route}/page/${(active.current - 1 < 1 ? 1 : active.current)}`}>
          <button className="join-item btn">
            Prev
          </button>
        </Link>
        {pagesRef.current.map((el, idx) => (
          <Link key={el} href={`search/${route}/page/${el}`}>
            <button
              className={`join-item btn ${String(active.current) === el && 'btn-primary'}`}
              disabled={idx === 3}
            >
              {el}
            </button>
          </Link>
        ))}
        <Link href={`search/${route}/page/${((active.current + 1))}`}>
          <button className="join-item btn">
            Next
          </button>
        </Link>
      </div>
    </div>
  )
}