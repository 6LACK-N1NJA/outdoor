import { promises as fs } from 'fs'
import { join } from 'path'
import Container from '@component/Container'
const pagesPath = join(process.cwd(), '/src/data/pages')

export async function generateMetadata({ params }) {
  return {
    title: `About`,
    description:
      'Your go-to guide for trekking, hiking, and camping adventures. Tips, gear comparisons, and trails',
    openGraph: {
      title: `About`,
      description:
        'Your go-to guide for trekking, hiking, and camping adventures. Tips, gear comparisons, and trails',
    },
    twitter: {
      title: `About`,
      description:
        'Your go-to guide for trekking, hiking, and camping adventures. Tips, gear comparisons, and trails',
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
Welcome to Pure Mountain View, your premier destination for all things related to trekking, hiking, and camping. Born from a passion for the great outdoors and a desire to share that passion with like-minded adventurers, Pure Mountain View serves as a comprehensive guide to exploring the natural world.

</div>
<h2>Our Mission</h2>
<div>
At Pure Mountain View, our mission is simple: to inspire, educate, and equip outdoor enthusiasts of all levels. Whether you're planning your first hike or looking to tackle a challenging trek, our goal is to provide you with the information, resources, and inspiration you need to take your outdoor adventures to new heights.



        </div>
        <h2>What We Offer</h2>
        <div>
        Expert Tips and Advice: From selecting the right gear to understanding trail etiquette, our tips and advice are grounded in experience and a deep love for outdoor exploration.
In-Depth Gear Comparisons: We know that the right gear can make or break an outdoor adventure. That's why we provide detailed comparisons and reviews to help you make informed decisions about the equipment you need for your next journey.
Trail Guides and Recommendations: Discover new trails and hidden gems with our curated guides. Whether you're looking for a serene hike or a challenging trek, we've got you covered.
Community and Support: Pure Mountain View is more than just a website; it's a community of outdoor enthusiasts. We encourage our readers to share their experiences, tips, and stories to inspire and support fellow adventurers.
        </div>
      </article>
    </Container>
  )
}
