import headerMenuLinks from 'src/constants/headerMenuLinks'
import { getAllEntitiesForeSitemap, getAllPostsForSitemap } from './api/strapiCalls'

export default async function sitemap() {
  const URL = process.env.CANONICAL_URL;
  const categories = headerMenuLinks.map(({ href }) => ({
    url: `${URL}${href}`,
    lastModified: new Date(),
  }))
  const posts = await getAllEntitiesForeSitemap()
  const postsLinks = posts?.map(({ link, updatedAt }) => ({
    url: `${URL}/${link}`,
    lastModified: updatedAt,
  }))
  return [
    {
      url: URL,
      lastModified: new Date(),
    },
    {
      url: `${URL}/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/affiliate-disclosure`,
      lastModified: new Date(),
    },
    ...categories,
    ...postsLinks,
  ]
}
