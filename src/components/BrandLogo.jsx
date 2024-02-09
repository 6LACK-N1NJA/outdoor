import Link from 'next/link'
import SITE_NAME from 'src/constants/siteName'

export default function BrandLogo({ fontSize = 'text-sm' }) {
  return (
    <Link title={SITE_NAME} href="/">
      <div className={`inline-flex justify-center gap-1.5 ${fontSize}`}>
        <span className="font-light pt-1 text-gray-900">{SITE_NAME.toUpperCase()}</span>
        <span aria-hidden="true" role="img">
          <span className=' text-xl'>
            🏔️
          </span>
        </span>
      </div>
    </Link>
  )
}
