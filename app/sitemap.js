import headerMenuLinks from 'src/constants/headerMenuLinks'
import { getAllPostsForSitemap } from './api/strapiCalls'

export default async function sitemap() {
  const URL = process.env.CANONICAL_URL;
  const categories = headerMenuLinks.map(({ href }) => ({
    url: `${URL}${href}`,
    lastModified: new Date(),
  }))
  const posts = await getAllPostsForSitemap()
  const postsLinks = posts?.map(({ attributes }) => ({
    url: `${URL}/${attributes.topic.data.attributes.slug}/${attributes.slug}`,
    lastModified: attributes.updatedAt,
  }))
  return [
    {
      url: URL,
      lastModified: new Date(),
    },
    ...categories,
    ...postsLinks,
  ]
}
