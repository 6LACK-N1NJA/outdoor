import { getPosts } from './api/strapiCalls'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import BlogGrid from '@component/BlogGrid'
import Spinner from '@component/Spinner'
import LoadMore from '@component/LoadMore'

export default async function Page() {
  const posts = await getPosts()
  const { data, meta } = posts
  return (
    <>
      <HeroBanner title="Time to get rich">
        Blog about personal financial development, investments and financial freedom
      </HeroBanner>
      <Container classNames="pb-8 lg:pb-12">
        <BlogGrid blogPosts={data} />
        <LoadMore fetchPosts={getPosts} primaryPagination={meta.pagination} />
      </Container>
    </>
  )
}
