'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { list } from 'radash'
import { useEffect, useMemo, useState } from 'react'

type Props = {
  pages: number
  route: string
}

export default function Paginator({ pages, route }: Props) {
  const pathname = usePathname()

  const [active, setActive] = useState(1)

  useEffect(() => {
    if (pathname === '/') {
      setActive(1)
      return
    }
    const page = Number(pathname.split('/').pop())
    if (page && isFinite(page)) {
      setActive(page)
    }
  }, [pathname])

  const previous = active - 1 || 1
  const next = ((active + 1) % pages) || pages

  const buildPaginatorList = useMemo(() => {
    if (active == 1) {
      return list(active, active + 1)
    }
    if (active + 1 >= pages) {
      return list(active - 1, active)
    }
    return list(active - 1, active + 1)
  }, [pages, active])

  return (
    <div className="flex justify-center p-4 w-full">
      {pages > 1 && <div className="join">
        {active !== 1 &&
          <Link href="/page/1" className="join-item btn">
            First
          </Link>
        }
        <Link href={`search/${route}/page/${previous}`} className="join-item btn">
          Prev
        </Link>

        {buildPaginatorList
          .map(page => (
            <Link
              className={`join-item btn ${page === active && 'btn-active'}`}
              href={`search/${route}/page/${page}`}
              key={page}
            >
              {page}
            </Link>
          ))
        }

        <Link href={`search/${route}/page/${next}`} className="btn">
          Next
        </Link>
        {active !== pages &&
          <Link href={`search/${route}/page/${pages}`} className="join-item btn">
            {pages}
          </Link>
        }
      </div>}
    </div>
  )
}
