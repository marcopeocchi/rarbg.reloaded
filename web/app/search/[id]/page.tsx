import Paginator from "@/components/Paginator"
import { roundMiB } from "@/utils/unit"
import { hashToMagnet } from "@/utils/url"
import SearchTable from "../SearchTable"

interface PageProps {
  params: {
    id: string
  }
}

async function fetcher(title: string) {
  const res = await fetch(`http://localhost:8080/api/name/${title}`, {
    next: { revalidate: 30 }
  })
  const data: Paginated<Torrent> = await res.json()

  return data
}

export default async function Page({ params }: PageProps) {
  const torrents = await fetcher(params.id)

  return <main>
    <div className="flex justify-center py-2 font-bold text-xl">
      Results for &quot;{params.id}&quot;
    </div>

    <SearchTable torrents={torrents.data} />

    <Paginator
      pages={torrents.pages}
      route={params.id}
    />
  </main>
}