type Paginated<T> = {
  data: T[]
  page: number
  pages: number
  page_size: number
}

type Torrent = {
  id: number
  hash: string
  title: string
  size: number
  category: string
  created_at: string
  imdbId: string
  rarbgId: string
  thumbnail_url: string
  screenshot_url: string
  nfo: string
}