import { getTopic, getPostsForTopic, getArticlesForOutoodCategory, getOutdoorCategory } from '@/api/strapiCalls'
import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import BlogGrid from '@component/BlogGrid'
import LoadMore from '@component/LoadMore'
import SITE_NAME from 'src/constants/siteName'
import TopicDescription from './components/TopicDesccription'
import MainArticleCard from './components/MainArticleCard'
import SecondaryArticleCard from './components/SecondaryArticleCard'

export async function generateMetadata({ params }) {
  const { slug } = params
  const topic = await getOutdoorCategory(slug)
  console.log(topic)
  return {
    title: `The ${topic.title} Page | ${SITE_NAME}`,
    description: topic.seo.metaDescription,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      title: topic.title,
      description: topic.description,
    },
    twitter: {
      title: topic.title,
      description: topic.description,
    },
  }
}

export default async function Page({ params }) {
  //const posts = await getArticlesForOutoodCategory(params.slug)
  const topic = await getOutdoorCategory(params.slug)
  const posts = topic.articles;
  const { data, meta } = posts
  const { slug } = params;
  const mainArticles = data.filter(({ attributes }) => attributes.isMain);
  const secondaryArticles = data.filter(({ attributes }) => !attributes.isMain);
  const fetchPostFromClient = async (page) => {
    'use server'
    return await getArticlesForOutoodCategory(params.slug, page)
  }
  return (
    <>
      {/* <HeroBanner title={topic.title}>{topic.info}</HeroBanner>
      <BlogGrid blogPosts={data} categorySlug={params.slug}/> */}
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        <TopicDescription text={topic.info} title={topic.title}/>
        <section className="m-4 grid grid-rows-3 gap-2">
          {mainArticles.map(({ attributes }) => <MainArticleCard topicSlug={slug} article={attributes}/>)}
        </section>
      </div>
      <section className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-11'>
        {secondaryArticles.map(({ attributes }) => <SecondaryArticleCard topicSlug={slug} article={attributes}/>)}
      </section>
      {/* <LoadMore fetchPosts={fetchPostFromClient} primaryPagination={meta.pagination} /> */}
    </>
  )
}
