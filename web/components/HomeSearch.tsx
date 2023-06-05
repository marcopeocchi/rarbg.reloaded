'use client'

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

export default function HomeSearch() {
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  useEffect(() => {
    const cb = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        router.push(`/search/${search}`)
      }
    }
    if (inputRef.current) {
      inputRef.current?.addEventListener('keydown', cb)
    }
    return () => {
      inputRef.current?.removeEventListener('keydown', cb)
    }
  }, [inputRef, search])

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search torrents"
      className="mt-16 input input-bordered w-full bg-base-200"
      onChange={e => setSearch(e.currentTarget.value)}
    />
  )
}