import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroller'
import { Person } from './Person'

const baseUrl = 'https://swapi-node.vercel.app'
const initialUrl = baseUrl + '/api/people/'

/**
 * The general fetcher
 *
 * @async
 * @param {string} url
 * @returns {Promise<unknown>}
 */
const fetchUrl = async (url) => {
  const response = await fetch(url)
  return response.json()
}

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
      lastPage.next ? baseUrl + lastPage.next : undefined
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
