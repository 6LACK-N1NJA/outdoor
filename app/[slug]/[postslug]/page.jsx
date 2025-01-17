import { getArticle } from '@/api/strapiCalls'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import createArticleElements from './parseRichTextFromStrapi'

export async function generateMetadata({ params }) {
  const { slug, postslug } = params
  const { blogData } = await getArticle(postslug)
  const { seo, cover } = blogData
  if (!seo) return
  const { metaTitle, metaDescription, keywords } = seo;
  return {
    title: `${metaTitle}`,
    description: metaDescription,
    keywords: keywords.split(', '),
    creator: 'Mykola Bludov',
    authors: [{ name: 'Mykola Bludov' }],
    openGraph: {
      title: `${metaTitle}`,
      description: metaDescription,
      image: cover.data.attributes.formats.thumbnail.url,
    },
    twitter: {
      title: metaTitle,
      description: metaDescription,
      image: cover.data.attributes.formats.thumbnail.url,
    },
    alternates: {
      canonical: `/${slug}/${postslug}`,
    },
  }
}

export default async function Page({ params }) {
  const { blogData, blogContent } = await getArticle(params.postslug)
  const articleElements = createArticleElements(blogContent)
  return (
    <>
      <script
        type="application/ld+json"
        //dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <article className="prose prose-img:rounded-lg mx-auto">
        <header>
          <time className="text-sm text-gray-700">
            {new Date(blogData.date || blogData.createdAt).toDateString()}
          </time>

          <h1 className="mt-1">{blogData.title}</h1>
        </header>
        {articleElements[0]}
        {!blogData.noCoverInText && (
                <Image
                  src={blogData.cover.data.attributes.formats.medium.url}
                  width={blogData.cover.data.attributes.formats.medium.width}
                  height={blogData.cover.data.attributes.formats.medium.height}
                  alt={blogData.seo[0]?.metaTitle}
                  title={blogData.seo[0]?.metaTitle}
                />)
          }
        {articleElements.slice(1)}
      </article>
    </>
  )
}
