import SearchTable from '@/app/search/SearchTable'
import Paginator from '@/components/Paginator'

interface PageProps {
  params: {
    id: string
    page: number
  }
}

async function fetcher(title: string, page: number) {
  const res = await fetch(
    `http://localhost:8080/api/name/${title}?page=${page}`, {
    cache: 'no-store'
  })
  const data: Paginated<Torrent> = await res.json()

  return data
}

export default async function Page({ params }: PageProps) {
  const torrents = await fetcher(params.id, params.page)

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