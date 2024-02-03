import { getTopic, getPostsForTopic, getArticlesForOutoodCategory, getOutdoorCategory } from '@/api/strapiCalls'
import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import BlogGrid from '@component/BlogGrid'
import LoadMore from '@component/LoadMore'
import SITE_NAME from 'src/constants/siteName'

export async function generateMetadata({ params }) {
  const { slug } = params
  const topic = await getOutdoorCategory(slug)
  return {
    title: `${topic.title} | ${SITE_NAME}`,
    description: topic.description,
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
  const fetchPostFromClient = async (page) => {
    'use server'
    return await getArticlesForOutoodCategory(params.slug, page)
  }
  return (
    <>
      <HeroBanner title={topic.title}>{topic.info}</HeroBanner>
      <BlogGrid blogPosts={data} categorySlug={params.slug}/>
      {/* <LoadMore fetchPosts={fetchPostFromClient} primaryPagination={meta.pagination} /> */}
    </>
  )
}
