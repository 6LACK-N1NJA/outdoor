import BlogCard from '@component/BlogCard'

export default function BlogGrid({ blogPosts, categorySlug }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map(({ attributes: blogPost }) => (
        <li key={blogPost.slug}>
          <BlogCard blogPost={blogPost} categorySlug={categorySlug} />
        </li>
      ))}
    </ul>
  )
}
