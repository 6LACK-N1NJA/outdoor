import { getArticle } from '@/api/strapiCalls';
import Link from 'next/link'
import Image from 'next/image'

export default async function MainArticleCard({ article, topicSlug }) {
    const { title, slug } = article;
    const fullArticle = await getArticle(slug);
    const { cover } = fullArticle.blogData;
    return (
        <Link href="/[slug]/[postslug]" as={`/${topicSlug}/${slug}`}>
            <article className='h-3/5 lg:h-1/2 xl:h-3/5'>
            <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
        <div className="h-full rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 ltr:group-hover:-translate-x-2 rtl:group-hover:translate-x-2">
         
          <div className="z-20 lg:p-3">
            <div>
              <h2 className=" pt-16 z-20 mt-4 text-lg font-medium text-gray-900 sm:text-xl">
                {title}
              </h2>

              {/* <time className="mt-1 text-xs text-gray-700">
                {new Date(blogPost.date || blogPost.createdAt).toDateString()}
              </time> */}
            </div>
          </div>
          {cover && <Image
            className='object-cover rounded-md z-10'
            src={cover.data.attributes.formats.small.url}
            // width={cover.data.attributes.formats.small.width}
            // height={cover.data.attributes.formats.small.height}
            alt={title}
            title={title}
            fill
          />
          }
        </div>
      </div>
            </article>
        </Link>
    )
}
