import Paginator from '@/components/Paginator'
import SearchTable from '../SearchTable'

interface PageProps {
  params: {
    id: string
  }
}

async function fetcher(title: string) {
  const res = await fetch(`http://localhost:8080/api/name/${title}`, {
    cache: 'no-store'
  })
  const data: Paginated<Torrent> = await res.json()

  return data
}

export default async function Page({ params }: PageProps) {
  const torrents = await fetcher(params.id)

  return <main>
    <div className="flex justify-center pb-6 font-bold text-2xl">
      Results for &quot;{params.id}&quot;
    </div>

    <SearchTable torrents={torrents.data} />

    <Paginator
      pages={torrents.pages}
      route={params.id}
    />
  </main>
}