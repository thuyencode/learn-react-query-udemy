import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroller'
import { fetchUrl } from '../libs/api'
import { Species } from './Species'

const initialUrl = import.meta.env.VITE_BASE_API + '/api/species/'

export function InfiniteSpecies() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ['api', 'species'],
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
          pageData.results.map((specie) => (
            <Species
              key={specie.fields.name}
              name={specie.fields.name}
              language={specie.fields.language}
              averageLifespan={specie.fields.average_lifespan}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  )
}
