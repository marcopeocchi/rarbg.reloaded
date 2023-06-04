import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="navbar bg-base-100">
        <Link
          href={'/'}
          className="btn btn-ghost normal-case text-xl"
        >
          RarBG.reloaded
        </Link>
      </div>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </div>
  )
}