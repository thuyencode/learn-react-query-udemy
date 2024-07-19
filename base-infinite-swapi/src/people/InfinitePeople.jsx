import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroller'
import { fetchUrl } from '../libs/api'
import { Person } from './Person'

const initialUrl = import.meta.env.VITE_BASE_API + '/api/people/'

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ['api', 'people'],
    queryFn: async ({ pageParam = initialUrl }) => await fetchUrl(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.next ? import.meta.env.VITE_BASE_API + lastPage.next : undefined
  })

  function loadMore() {
    if (isFetching) {
      return
    }

    fetchNextPage()
  }

  if (isLoading) {
    return <h2 className='loading'>Loading...</h2>
  }

  if (isError) {
    return <h2>Error! {error.toString()}</h2>
  }

  return (
    <>
      <InfiniteScroll
        initialLoad={false}
        hasMore={hasNextPage}
        loadMore={loadMore}
      >
        {data.pages.map((pageData) =>
          pageData.results.map((person) => (
            <Person
              key={person.fields.name}
              name={person.fields.name}
              hairColor={person.fields.hair_color}
              eyeColor={person.fields.eye_color}
            />
          ))
        )}
      </InfiniteScroll>

      {isFetching ? <h2 className='loading'>Fetching...</h2> : null}
    </>
  )
}
