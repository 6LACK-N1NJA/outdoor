import { promises as fs } from 'fs'
import { join } from 'path'
import Container from '@component/Container'
const pagesPath = join(process.cwd(), '/src/data/pages')

export async function generateMetadata({ params }) {
  return {
    title: `Affiliate Disclosure`,
    description:
      'Your go-to guide for trekking, hiking, and camping adventures. Tips, gear comparisons, and trails',
    openGraph: {
      title: `Affiliate Disclosure`,
      description:
        'Your go-to guide for trekking, hiking, and camping adventures. Tips, gear comparisons, and trails',
    },
    twitter: {
      title: `Affiliate Disclosure`,
      description:
        'Your go-to guide for trekking, hiking, and camping adventures. Tips, gear comparisons, and trails',
    },
    alternates: {
      canonical: `/affiliate-disclosure`,
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
        <h1>Affiliate Disclosure</h1>

At Mountain View, our mission is to inspire and equip you for your next outdoor adventure. We're committed to sharing our expertise and passion for trekking, hiking, and camping through in-depth guides, tips, and gear comparisons.

<h2>Transparency and Trust</h2>

In the spirit of transparency, we want you to know that some of the links on our site are affiliate links. This means that if you click on one of these links and make a purchase, Mountain View may receive a small commission at no extra cost to you. These commissions help us to keep Mountain View running and continue providing valuable content to our community.

<h2>Our Commitment to Honesty</h2>

Our recommendations are always based on our own research and experience. We review and compare gear with the aim of helping you make the best choices for your needs. The presence of an affiliate link does not influence our recommendation. We prioritize your trust and our integrity above all, ensuring that our content is honest and reliable.

<h2>Your Support</h2>

By using our affiliate links, you're supporting Mountain View and our mission. We're deeply grateful for your support, as it allows us to continue creating content that helps you and the wider outdoor community.

<h2>Questions?</h2>

If you have any questions about our Affiliate Disclosure or our affiliations, please don't hesitate to contact us. We're here to help and ensure you have all the information you need.

Thank you for being a part of the Mountain View community. Happy trails!
      </article>
    </Container>
  )
}
