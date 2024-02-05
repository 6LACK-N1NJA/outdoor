import { promises as fs } from 'fs'
import { join } from 'path'
import Container from '@component/Container'
const pagesPath = join(process.cwd(), '/src/data/pages')

export async function generateMetadata({ params }) {
  return {
    title: `Privacy Policy`,
    description:
      'Your go-to guide for trekking, hiking, and camping adventures. Tips, gear comparisons, and trails',
    openGraph: {
      title: `Privacy Policy`,
      description:
        'Your go-to guide for trekking, hiking, and camping adventures. Tips, gear comparisons, and trails',
    },
    twitter: {
      title: `Privacy Policy`,
      description:
        'Your go-to guide for trekking, hiking, and camping adventures. Tips, gear comparisons, and trails',
    },
    alternates: {
      canonical: `/privacy-policy`,
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
        <h1>Privacy Policy for Pure Mountain View</h1>

        Welcome to Pure Mountain View. Your privacy is critically important to us. This Privacy Policy document outlines the types of information that is collected and recorded by Pure Mountain View and how we use it.

<h2>Information We Collect</h2>

We collect several different types of information for various purposes to provide and improve our service to you. Types of Data collected may include:

- Personal Data: While using our site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to, your email address and name.
- Usage Data: We may also collect information on how the Service is accessed and used. This Usage Data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, our Service pages that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.

<h2>Use of Data</h2>

Mountain View uses the collected data for various purposes, including:

- To provide and maintain our Service
- To notify you about changes to our Service
- To allow you to participate in interactive features of our Service when you choose to do so
- To provide customer support
- To gather analysis or valuable information so that we can improve our Service
- To monitor the usage of our Service
- To detect, prevent, and address technical issues

<h2>Cookies and Web Beacons</h2>

Like many other websites, Mountain View uses 'cookies' to enhance your experience, gather general visitor information, and track visits to our website. Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
      </article>
    </Container>
  )
}
