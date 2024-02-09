import Link from 'next/link'

export default function SecondaryArticleCard({ article, topicSlug }) {
    const { title, slug, cover } = article;
    return (
        <Link href="/[slug]/[postslug]" as={`/${topicSlug}/${slug}`}>
            <article className='h-full'>
            <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
        <div className="h-full rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 ltr:group-hover:-translate-x-2 rtl:group-hover:translate-x-2">
          {cover && <Image
            src={blogPost.cover.data.attributes.formats.small.url}
            width={blogPost.cover.data.attributes.formats.small.width}
            height={blogPost.cover.data.attributes.formats.small.height}
            alt={blogPost.title}
            title={blogPost.title}
          />
          }
          <div className="p-4 sm:p-6 lg:p-8">
            <div>
              <h2 className="mt-4 text-lg font-medium text-gray-900 sm:text-xl">
                {title}
              </h2>

              {/* <time className="mt-1 text-xs text-gray-700">
                {new Date(blogPost.date || blogPost.createdAt).toDateString()}
              </time> */}
            </div>
          </div>
        </div>
      </div>
            </article>
        </Link>
    )
}
