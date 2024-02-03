import Link from 'next/link'
import SITE_NAME from 'src/constants/siteName'

export default function BrandLogo({ fontSize = 'text-sm' }) {
  return (
    <Link href="/">
      <div className={`inline-flex gap-1.5 ${fontSize}`}>
        <span className="font-medium text-gray-900">{SITE_NAME}</span>

        <span aria-hidden="true" role="img">
          🏔️
        </span>
      </div>
    </Link>
  )
}
