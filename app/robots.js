export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      //disallow: ['/components/', '/blogs/'],
    },
    sitemap: `${process.env.CANONICAL_URL}/sitemap.xml`,
  }
}
