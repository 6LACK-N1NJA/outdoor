import { getArticles } from './api/strapiCalls'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import BlogGrid from '@component/BlogGrid'
import Spinner from '@component/Spinner'
import LoadMore from '@component/LoadMore'
import SITE_NAME from 'src/constants/siteName'
import Link from 'next/link'

export default async function Page() {
  const articles = await getArticles()
  console.log(articles)
  const headerStyle = 'text-zinc-700 text-2xl'
  const PageColumn = ({ children }) => <article className=' border-b-2 lg:border-b-0'>{children}</article>;
  return (
    <>
      <HeroBanner title={SITE_NAME}>
      Your go-to guide for trekking, hiking, and camping adventures. Tips, gear comparisons, and trails
      </HeroBanner>
      <Container classNames="pb-8 lg:pb-12">
        <section className='flex flex-col lg:flex-row justify-around'>
          <PageColumn>
            <h2 className={`${headerStyle}`}>Information</h2>
          </PageColumn>
          <PageColumn>
            <h2 className={`${headerStyle}`}>Destinations</h2>
          </PageColumn>
          <PageColumn>
            <h2 className={`${headerStyle}`}>Gear Comperison</h2>
          </PageColumn>
        </section>
        {/* <h2>
          Discover the trekking
        </h2>
        <Link href={'/trekking'}>Trekking section</Link>
        <h2>
          Discover the trekking gear comparison
        </h2>
        <Link href={'/gear-comparison'}>Gear comparison section</Link> */}
      </Container>
    </>
  )
}
