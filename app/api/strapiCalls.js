'use server'

import { notFound } from 'next/navigation'

const paginationSize = 6

export async function getPosts(paginationPage) {
  const posts = await (
    await fetch(
      `${
        process.env.STRAPI
      }/posts?populate[0]=topic&populate[1]=cover&fields[0]=title&fields[1]=date&fields[2]=createdAt&fields[3]=slug&sort=createdAt:desc&pagination[page]=${
        paginationPage || 1
      }&pagination[pageSize]=${paginationSize}`,
      { next: { revalidate: 3600 } }
    )
  ).json()
  return posts
}

export async function getAllPostsForSitemap() {
  const posts = await (
    await fetch(
      `${process.env.STRAPI}/posts?populate[0]=topic&fields[0]=slug&fields[1]=updatedAt&sort=createdAt:desc`,
      { next: { revalidate: 36000 } }
    )
  ).json()
  return posts.data
}

export async function getPostsForTopic(slug, paginationPage) {
  const posts = await (
    await fetch(
      `${
        process.env.STRAPI
      }/posts?populate[0]=topic&populate[1]=cover&fields[0]=title&fields[1]=date&fields[2]=createdAt&fields[3]=slug&filters[topic][slug][$eq]=${slug}&sort=createdAt:desc&pagination[page]=${
        paginationPage || 1
      }&pagination[pageSize]=${paginationSize}`
    )
  ).json()
  return posts
}

export async function getTopic(slug) {
  try {
    const topics = await (await fetch(`${process.env.STRAPI}/topics`)).json()
    return topics.data.find(({ attributes }) => attributes.slug === slug).attributes
  } catch {
    notFound()
  }
}

export async function getPost(params) {
  try {
    const post = await (
      await fetch(`${process.env.STRAPI}/posts?populate=*&filters[slug][$eq]=${params.postslug}`)
    ).json()
    const postItem = post.data[0].attributes
    return {
      blogData: postItem,
      blogContent: postItem.body,
    }
  } catch {
    notFound()
  }
}

export async function getComparisonConfing(params) {
  try {
    const { product } = params
    const post = await getAllPostsForSitemap()
    return {
      post,
      config: [],
    }
  } catch {
    notFound()
  }
}
