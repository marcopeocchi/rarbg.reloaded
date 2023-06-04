'use client'

import HomeSearch from "@/components/HomeSearch"
import Logo from "@/components/Logo"

export default function Home() {

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <Logo />
        <HomeSearch />
      </div>
    </main>
  )
}
