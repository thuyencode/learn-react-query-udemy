import { useQuery } from '@tanstack/react-query'
import { fetchComments } from './api'
import './PostDetail.css'

/**
 * The `PostDetail` component
 *
 * @export
 * @param {{ post: any; deleteMutation: import('@tanstack/react-query').UseMutationResult; updateMutation: import('@tanstack/react-query').UseMutationResult; }} props
 * @param {*} props.post
 * @param {import('@tanstack/react-query').UseMutationResult} props.deleteMutation
 * @param {import('@tanstack/react-query').UseMutationResult} props.updateMutation
 * @returns {ReactElement}
 */
export function PostDetail({ post, deleteMutation, updateMutation }) {
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
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>

        {deleteMutation.isPending ? (
          <p className='loading'>Deleting the post...</p>
        ) : null}

        {deleteMutation.isError ? (
          <p className='error'>Error deleting the post.</p>
        ) : null}

        {deleteMutation.status === 'success' ? (
          <p className='success'>The post was (not) deleted.</p>
        ) : null}
      </div>

      <div>
        <button onClick={() => updateMutation.mutate(post.id)}>
          Update title
        </button>

        {updateMutation.isPending ? (
          <p className='loading'>Updating the post...</p>
        ) : null}

        {updateMutation.isError ? (
          <p className='error'>Error updating the post.</p>
        ) : null}

        {updateMutation.status === 'success' ? (
          <p className='success'>The post was (not) updated.</p>
        ) : null}
      </div>

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
