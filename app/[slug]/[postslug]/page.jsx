import { promises as fs } from 'fs'
import { join } from 'path'
import Container from '@component/Container'
import { createElement } from 'react'
import { getPost } from '@/api/strapiCalls'
import Image from 'next/image'
import Link from 'next/link'
import StrapiImage, { sizeList } from '@component/StrapiImage'

export async function generateMetadata({ params }) {
  const { slug, postslug } = params
  const { blogData } = await getPost(params)
  const { seo, cover } = blogData
  if (!seo[0]) return
  const { metaTitle, metaDescription, keywords } = seo[0]
  return {
    title: `${metaTitle}`,
    description: metaDescription,
    keywords: keywords.split(', '),
    creator: 'Dubby Rich',
    authors: [{ name: 'Dubby Rich' }],
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
  const { blogData, blogContent } = await getPost(params)

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

        {blogContent.map(({ type, level, children, image }, index, list) => {
          if (type === 'image') {
            return (
              <Image
                key={index}
                src={image.formats.small.url}
                width={image.formats.small.width}
                height={image.formats.small.height}
                alt={list[index - 1].children[0]?.text || 'Image in text'}
                title={list[index - 1].children[0]?.text || `Image #${index}`}
              />
            )
          }
          const wrapElementName = type === 'heading' ? `h${level}` : 'div'
          let text
          if (children.length === 1) {
            text = children[0].text
          } else {
            text = (
              <>
                {children.map(({ type, text, url, children }) => {
                  if (type === 'text') {
                    return text
                  }
                  if (type === 'link') {
                    return (
                      <Link key={index + url} target="_blank" href={url}>
                        {children[0].text}
                      </Link>
                    )
                  }
                })}
              </>
            )
          }
          const el = createElement(wrapElementName, { key: index }, text)
          return index === 0 ? (
            <div key={index}>
              {el}
              {!blogData.noCoverInText && (
                <Image
                  src={blogData.cover.data.attributes.formats.medium.url}
                  width={blogData.cover.data.attributes.formats.medium.width}
                  height={blogData.cover.data.attributes.formats.medium.height}
                  alt={blogData.seo[0]?.metaTitle}
                  title={blogData.seo[0]?.metaTitle}
                />
              )}
            </div>
          ) : (
            el
          )
        })}
      </article>
    </>
  )
}
