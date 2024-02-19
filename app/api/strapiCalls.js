'use server'

import { notFound } from 'next/navigation'
import 'server-only'

const paginationSize = 6
const REVALIDATION_INTERVAL = 72000;

export async function getPosts(paginationPage) {
  const posts = await (
    await fetch(
      `${
        process.env.STRAPI
      }/posts?populate[0]=topic&populate[1]=cover&fields[0]=title&fields[1]=date&fields[2]=createdAt&fields[3]=slug&sort=createdAt:desc&pagination[page]=${
        paginationPage || 1
      }&pagination[pageSize]=${paginationSize}`,
      { next: { revalidate: REVALIDATION_INTERVAL } }
    )
  ).json()
  return posts
}

export async function getAllPostsForSitemap() {
  const posts = await (
    await fetch(
      `${process.env.STRAPI}/posts?populate[0]=topic&fields[0]=slug&fields[1]=updatedAt&sort=createdAt:desc`,
      { next: { revalidate: REVALIDATION_INTERVAL } }
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

export async function getArticlesForOutoodCategory(slug, paginationPage) {
  const articles = await (
    await fetch(
      `${
        process.env.STRAPI
      }/articless?populate[0]=topic&populate[1]=cover&fields[0]=title&fields[1]=createdAt&fields[3]=slug&filters[topic][slug][$eq]=${slug}&sort=createdAt:desc&pagination[page]=${
        paginationPage || 1
      }&pagination[pageSize]=${paginationSize}`,
      { next: { revalidate: REVALIDATION_INTERVAL } }
    )
  ).json()
  return articles;
}
export async function getTopic(slug) {
  try {
    const topics = await (await fetch(`${process.env.STRAPI}/topics`)).json()
    return topics.data.find(({ attributes }) => attributes.slug === slug)?.attributes
  } catch {
    notFound()
  }
}
export async function getOutdoorCategory(slug) {
  try {
    const categories = await (await fetch(`${process.env.STRAPI}/outdoor-activity-categories?populate=*`)).json()
    return categories.data.find((a) => a?.attributes.slug === slug)?.attributes
  } catch (e) {
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

export async function getArticle(postslug) {
  try {
    const post = await (
      await fetch(`${process.env.STRAPI}/articles?populate=*&filters[slug][$eq]=${postslug}`,
      { next: { revalidate: REVALIDATION_INTERVAL } })
    ).json()
    const postItem = post.data[0].attributes
    return {
      blogData: postItem,
      blogContent: postItem.text,
    }
  } catch {
    notFound()
  }
}

export async function getArticles() {
  try {
    const res = (await fetch(`${process.env.STRAPI}/articles`, { next: { revalidate: REVALIDATION_INTERVAL } })).json();
    return res;
  } catch {
    notFound()
  }
}

export async function getArticlesForSitemap() {
  try {
    const posts = await (
      await fetch(`${process.env.STRAPI}/articles?populate=*`)
    ).json()
    const articles = posts.data.map(({ attributes }) => {
      const postItem = attributes
    const { slug, outdoor_activity_categories, updatedAt } = postItem;
    const category = outdoor_activity_categories.data[0]?.attributes.slug;
    return { link: `${category}/${slug}`, updatedAt };
    })
    return articles;
  } catch {
    notFound()
  }
}


export async function getComparisonConfingList() {
  try {
    const response = await (
      await fetch(`${process.env.STRAPI}/comparisons?populate=*`,
      { next: { revalidate: REVALIDATION_INTERVAL } }
      )
    ).json()
    const configList = response.data;
    return {
      configList,
    }
  } catch (e) {
    console.error(e)
  }
}

export async function getProductCardConfig(cardId) {
  try {
    const res = await (
      await fetch(`${process.env.STRAPI}/comparison-product-card-configs/${cardId}?populate=*`)
    ).json()
    return res.data.attributes;
  } catch(e) {
    console.error(e)
  }
}

export async function getFiltersConfig(filterIds) {
  try {
    return await Promise.all(
      filterIds.map(async (filterId) => {
        const res = await (
          await fetch(`${process.env.STRAPI}/comparison-filters-configs/${filterId}?populate=*`)
        ).json()
        return res.data.attributes;
      })
    )
  } catch(e) {
    console.error(e)
  }
}

export async function getRankingConfig(rankingIds) {
  try {
    return await Promise.all(
      rankingIds.map(async (id) => {
        const res = await (
          await fetch(`${process.env.STRAPI}/rankings/${id}?populate=*`)
        ).json()
        return res.data.attributes;
      })
    )
  } catch(e) {
    console.error(e)
  }
}

export async function getAllEntitiesForeSitemap() {
  const { configList } = await getComparisonConfingList();
  const articles = await getArticlesForSitemap();
  const linkList = [ ...articles, ...configList.map(({ attributes }) => ({link: `gear-comparison/${attributes.slug}`, updatedAt: attributes.updatedAt}))]
  return linkList;
}