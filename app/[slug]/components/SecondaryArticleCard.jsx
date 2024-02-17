import { getArticle } from '@/api/strapiCalls';
import Link from 'next/link'
import Image from 'next/image'


export default async function SecondaryArticleCard({ article, topicSlug, key }) {
    const { title, slug, date, createdAt, updatedAt, publishedAt } = article;
    const fullArticle = await getArticle(slug);
    const { cover } = fullArticle.blogData;
    return (
        <Link key={key} href="/[slug]/[postslug]" as={`/${topicSlug}/${slug}`}>
            <article className='h-full'>
            <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
        <div className="h-full rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 ltr:group-hover:-translate-x-2 rtl:group-hover:translate-x-2">
          {/* {cover && <Image
            src={cover.data.attributes.formats.small.url}
            width={cover.data.attributes.formats.small.width}
            height={cover.data.attributes.formats.small.height}
            alt={title}
            title={title}
          />
          } */}
         
              

              {/* <time className="mt-1 text-xs text-gray-700">
                {new Date(blogPost.date || blogPost.createdAt).toDateString()}
              </time> */}
             <div className='h-32 relative'>
             {cover && <Image
            className=' object-cover rounded-md z-10'
            src={cover.data.attributes.formats.small.url}
            // width={cover.data.attributes.formats.small.width}
            // height={cover.data.attributes.formats.small.height}
            alt={title}
            title={title}
            fill
          />
          }
             </div>
             <div className="p-1 lg:p-2">
            <div>
            <time className="text-xs text-zinc-600">
                {new Date(date || publishedAt).toDateString()}
              </time>
             <h2 className=" text-lg font-medium text-gray-900 sm:text-xl">
                {title}
              </h2>
            </div>
          </div>
        </div>
      </div>
            </article>
        </Link>
    )
}
