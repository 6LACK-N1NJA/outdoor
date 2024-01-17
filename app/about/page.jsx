import { promises as fs } from 'fs'
import { join } from 'path'
import Container from '@component/Container'
const pagesPath = join(process.cwd(), '/src/data/pages')

export async function generateMetadata({ params }) {
  return {
    title: `About`,
    description:
      'Your guide to navigating the intricate world of investments and financial mastery',
    openGraph: {
      title: `About`,
      description:
        'Your guide to navigating the intricate world of investments and financial mastery',
    },
    twitter: {
      title: `About`,
      description:
        'Your guide to navigating the intricate world of investments and financial mastery',
    },
    alternates: {
      canonical: `/about`,
    },
  }
}

export async function generateStaticParams() {
  return await fs.readdir(pagesPath)
}

export default async function Page({ params }) {
  return (
    <Container classNames="py-8 lg:py-12">
      <article className="prose mx-auto">
        <h1>About</h1>
        <div>
          Welcome to Time To Get Rich, your guide to navigating the intricate world of investments
          and financial mastery. Join me on a journey where we explore the fundamentals of smart
          investing, share insights into stocks, start-ups, real estate, and the dynamic realm of
          cryptocurrency. Discover the mindset shifts required for financial success, learn
          decision-making frameworks, and delve into real-life success stories.
        </div>
        <div>
          Whether you're a seasoned investor or just starting, Time To Get Rich provides practical
          advice, actionable strategies, and a supportive community to help you make informed
          financial decisions. Explore our comprehensive resources, engage in thought-provoking
          discussions, and embark on a path towards a wealthier and wiser future.
        </div>
      </article>
    </Container>
  )
}
