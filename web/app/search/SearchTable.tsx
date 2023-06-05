import CategoryBadge from '@/components/CategoryBadge'
import { roundMiB } from '@/utils/unit'
import { hashToMagnet } from '@/utils/url'
import { TbMagnet } from 'react-icons/tb'

type Props = {
  torrents: Torrent[]
}

export default function SearchTable({ torrents }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Created at</th>
            <th>Size</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {torrents.map(t => (
            <tr key={t.id} className="hover">
              <td>{t.title}</td>
              <td>{new Date(t.created_at).toLocaleString()}</td>
              <td>{roundMiB(t.size)}</td>
              <td><CategoryBadge category={t.category} /></td>
              <td>
                <a
                  className="btn btn-sm btn-info"
                  href={hashToMagnet(t.hash)}
                >
                  Magnet <TbMagnet />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}