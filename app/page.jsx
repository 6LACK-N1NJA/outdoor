import { getPosts } from './api/strapiCalls'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import BlogGrid from '@component/BlogGrid'
import Spinner from '@component/Spinner'
import LoadMore from '@component/LoadMore'
import SITE_NAME from 'src/constants/siteName'
import Link from 'next/link'

export default async function Page() {
  const posts = await getPosts()
  const { data, meta } = posts
  return (
    <>
      <HeroBanner title={SITE_NAME}>
      Your go-to guide for trekking, hiking, and camping adventures. Tips, gear comparisons, and trails
      </HeroBanner>
      <Container classNames="pb-8 lg:pb-12">
        <h2>
          Discover the trekking
        </h2>
        <Link href={'/trekking'}>Trekking section</Link>
        <h2>
          Discover the trekking gear comparison
        </h2>
        <Link href={'/gear-comparison'}>Gear comparison section</Link>
      </Container>
    </>
  )
}
