import Link from 'next/link'

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
      {children}
    </div>
  )
}