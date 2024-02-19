import { getArticles, getComparisonConfingList } from './api/strapiCalls'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import BlogGrid from '@component/BlogGrid'
import Spinner from '@component/Spinner'
import LoadMore from '@component/LoadMore'
import SITE_NAME from 'src/constants/siteName'
import Link from 'next/link'
import articleTypes from 'src/constants/articleTypes'
import MainArticleCard from './[slug]/components/MainArticleCard'

export default async function Page() {
  const articles = await getArticles()
  const knowledgeArticles = articles.data?.filter(({ attributes }) => attributes.type === articleTypes.knowledge);
  const destinationArticles = articles.data?.filter(({ attributes }) => attributes.type === articleTypes.destination);
  const comperisons = await getComparisonConfingList();
  const headerStyle = 'text-zinc-700 text-2xl'
  const PageColumn = ({ children }) => <article className=' border-b-2 lg:border-b-0'>{children}</article>;
  const basicMapper = ({ attributes }) => <li key={`complist_${attributes.slug}`}><Link href="/gear-comparison/[[...filters]]" as={`/gear-comparison/${attributes.slug}`}>{`${attributes.title} ${attributes.emoji ? attributes.emoji: ''}`}</Link></li>
  return (
    <>
      <HeroBanner title={SITE_NAME}>
      Your go-to guide for trekking, hiking, and camping adventures. Tips, gear comparisons, and trails
      </HeroBanner>
      <Container classNames="pb-8 lg:pb-12">
        <section className='flex flex-col lg:flex-row justify-around'>
          <PageColumn>
            <h2 className={`${headerStyle}`}>Information</h2>
            {knowledgeArticles.map(basicMapper)}
          </PageColumn>
          <PageColumn>
            <h2 className={`${headerStyle}`}>Destinations</h2>
            {destinationArticles.map(basicMapper)}
          </PageColumn>
          <PageColumn>
            <h2 className={`${headerStyle}`}>Gear Comparison</h2>
            <ul>
              {comperisons.configList.map(basicMapper)}
            </ul>
          </PageColumn>
        </section>
      </Container>
    </>
  )
}
