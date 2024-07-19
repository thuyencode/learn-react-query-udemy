import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroller'

const initialUrl = 'https://swapi.dev/api/people/'

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
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['api', 'people'],
    queryFn: async ({ pageParam = initialUrl }) => await fetchUrl(pageParam),
    getNextPageParam: (lastPage) => lastPage.next || undefined
  })

  return <InfiniteScroll />
}
