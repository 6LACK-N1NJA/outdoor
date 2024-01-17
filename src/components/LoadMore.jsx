'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import BlogGrid from './BlogGrid'
import Spinner from './Spinner'

export default function LoadMore({ fetchPosts, primaryPagination }) {
  const [posts, setPosts] = useState([])
  const { ref, inView } = useInView()
  const [pagination, setPagination] = useState(primaryPagination)

  async function loadMore() {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const res = await fetchPosts(pagination.page + 1)
    const { data, meta } = res
    setPosts([...posts, ...data])
    setPagination(meta.pagination)
  }

  useEffect(() => {
    if (inView && pagination.page < pagination.pageCount) {
      loadMore()
    }
  }, [inView])

  return (
    <div className="pt-8 lg:pt-12">
      {posts.length > 0 && <BlogGrid blogPosts={posts} />}
      {pagination.page < pagination.pageCount && (
        <div
          ref={ref}
          className="col-span-1 flex items-center justify-center p-4 sm:col-span-2 md:col-span-3"
        >
          <Spinner />
        </div>
      )}
    </div>
  )
}
