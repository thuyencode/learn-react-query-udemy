import { useQuery } from '@tanstack/react-query'
import { fetchComments } from './api'
import './PostDetail.css'

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts', post.id, 'comments'],
    queryFn: async () => await fetchComments(post.id)
  })

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
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  )
}
