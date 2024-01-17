import Link from 'next/link'

import Container from '@component/Container'
import BrandLogo from '@component/BrandLogo'
import Image from 'next/image'

export default function Footer() {
  const menuLinks = [
    {
      title: 'FAQs',
      href: '/about/faqs',
    },
    {
      title: 'Acknowledgements',
      href: '/about/acknowledgements',
    },
  ]

  return (
    <footer className="border-t border-gray-200 bg-white">
      <Container classNames="py-4 lg:py-5">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <BrandLogo fontSize="text-lg" />
            <div className="mt-2">
              <p className="leading-relaxed text-gray-600">
                Blog about personal financial development, investments and financial freedom
              </p>
            </div>
          </div>
          <div>
            <Link href="https://twitter.com/timetogetrich_" target="_blank">
              <Image src="/x-logo.jpg" width={45} height={45} alt="The X logo" title="The X logo" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
