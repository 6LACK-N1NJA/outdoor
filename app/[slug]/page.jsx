import { getTopic, getPostsForTopic } from '@/api/strapiCalls'
import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import BlogGrid from '@component/BlogGrid'
import LoadMore from '@component/LoadMore'

export async function generateMetadata({ params }) {
  const { slug } = params
  const topic = await getTopic(slug)
  return {
    title: `${topic.title} | Time To Get Rich`,
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
  const posts = await getPostsForTopic(params.slug)
  const { data, meta } = posts
  const topic = await getTopic(params.slug)
  const fetchPostFromClient = async (page) => {
    'use server'
    return await getPostsForTopic(params.slug, page)
  }
  return (
    <>
      <HeroBanner title={topic.title}>{topic.description}</HeroBanner>
      <BlogGrid blogPosts={data} />
      <LoadMore fetchPosts={fetchPostFromClient} primaryPagination={meta.pagination} />
    </>
  )
}
