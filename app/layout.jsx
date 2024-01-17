import { Inter } from 'next/font/google'

import 'prismjs/themes/prism-okaidia.css'
import '@style/site.css'

import Footer from '@component/Footer'
import Header from '@component/Header'
import Script from 'next/script'
import Container from '@component/Container'

export const metadata = {
  metadataBase: new URL('https://timetogetrich.online'),
  title: 'Time To Get Rich',
  description: 'Blog about personal financial development, investments and financial freedom',
  openGraph: {
    title: 'Time To Get Rich',
    description: 'Blog about personal financial development, investments and financial freedom',
    url: 'https://www.timetogetrich.online/',
    siteName: 'Time To Get Rich',
    type: 'website',
  },
  alternates: {
    canonical: `/`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time To Get Rich',
    description: 'Blog about personal financial development, investments and financial freedom',
  },
  verification: {
    //google: "T6NYAA6XPT9qPpazXVJ6i22OeY6TRtCxxnTkRG1njt0",
  },
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({ children }) {
  return (
    <html className="h-full scroll-smooth" lang="en" dir="ltr">
      {/*<Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.PUB_GA}`}
      />
      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.PUB_GA}', {
          page_path: window.location.pathname,
          });
        `}
        </Script>*/}
      <link rel="icon" href="/favicon.ico" media="(prefers-color-scheme: light)" />
      <link rel="icon" href="/favicon-dark.ico" media="(prefers-color-scheme: dark)" />
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        {/* <HeaderBanner /> */}
        <main className="bg-white">
          <Container classNames="">{children}</Container>
        </main>
        <Footer />
      </body>
    </html>
  )
}
