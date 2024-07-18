/* eslint-disable react-hooks/exhaustive-deps */
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { deletePost, fetchPosts } from './api'
import { PostDetail } from './PostDetail'
const maxPostPage = 10

/**
 * Query Options for fetching posts
 *
 * @param {number} page
 * @returns {import('@tanstack/react-query').QueryOptions}
 */
function postsQuery(page) {
  return queryOptions({
    queryKey: ['posts', { page }],
    queryFn: async () => await fetchPosts(page),
    staleTime: 2000
  })
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPost, setSelectedPost] = useState(null)

  const queryClient = useQueryClient()

  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery(postsQuery(currentPage))

  const deleteMutation = useMutation({
    mutationFn: async (postId) => await deletePost(postId)
  })

  useEffect(() => {
    queryClient.prefetchQuery(postsQuery(currentPage + 1))
  }, [currentPage])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return (
      <>
        <h2>Oops, something went wrong!</h2>
        <p>{error.toString()}</p>
      </>
    )
  }

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className='post-title'
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className='pages'>
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((prev) => prev - 1)
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((prev) => prev + 1)
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && (
        <PostDetail post={selectedPost} deleteMutation={deleteMutation} />
      )}
    </>
  )
}
