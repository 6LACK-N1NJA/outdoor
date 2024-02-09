import Link from 'next/link'

export default function MainArticleCard({ article, topicSlug }) {
    const { title, slug } = article;
    return (
        <Link href="/[slug]/[postslug]" as={`/${topicSlug}/${slug}`}>
            <article>
                <h2>{title}</h2>
            </article>
        </Link>
    )
}
