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

import DestinationArticleCard from '@component/DestinationArticleCard'

export default async function Page() {
  const articles = await getArticles();
  const knowledgeArticles = articles.data?.filter(
    ({ attributes }) => attributes.type === articleTypes.knowledge
  );
  const destinationArticles = articles.data?.filter(
    ({ attributes }) => attributes.type === articleTypes.destination
  );
  const comperisons = await getComparisonConfingList();
  const headerStyle = 'text-zinc-700 text-2xl text-emerald-900';

  // Utility function to shuffle an array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // function shuffleArray(array){
  //   return array.sort(() => Math.random() - 0.5);
  // }

  // Shuffle the articles
  const shuffledKnowledgeArticles = shuffleArray(knowledgeArticles);
  const shuffledDestinationArticles = shuffleArray(destinationArticles);


  const PageColumn = ({ children }) => (
    <article className="border-b-2 lg:border-b-0">{children}</article>
  );

  const basicMapper = (href, as) => ({ attributes }) => {
    const topicSlug = `/${attributes.outdoor_activity_categories?.data[0]?.attributes.slug}/`;

    return (
      <li key={`complist_${attributes.slug}`}>
        <Link href={href} as={`${as || topicSlug}${attributes.slug}`}>
          {`${attributes.title} ${attributes.emoji ? attributes.emoji : ''}`}
        </Link>
      </li>
    );
  };

  return (
    <>
      <HeroBanner title={SITE_NAME}>
        Your go-to guide for trekking, hiking, and camping adventures. Tips, gear comparisons, and trails
      </HeroBanner>
      <Container classNames="pb-8 lg:pb-12">
        <section className="flex flex-col lg:flex-row justify-around">
          <PageColumn>
            <h2 className={`${headerStyle}`}>Information</h2>
            {shuffledKnowledgeArticles.map(basicMapper('/[slug]/[postslug]'))}
          </PageColumn>
          <PageColumn>
            <h2 className={`${headerStyle}`}>Destinations</h2>
            <ul className="space-y-4">
              {shuffledDestinationArticles.map((article) => (
                <li key={`destination_${article.attributes.slug}`}>
                  <DestinationArticleCard article={article.attributes} />
                </li>
              ))}
            </ul>
          </PageColumn>

          <PageColumn>
            <h2 className={`${headerStyle}`}>Gear Comparison</h2>
            <ul>
              {comperisons.configList.map(
                basicMapper('/gear-comparison/[[...filters]]', '/gear-comparison/')
              )}
            </ul>
          </PageColumn>
        </section>
      </Container>
    </>
  );
}
