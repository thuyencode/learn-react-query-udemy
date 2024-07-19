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
  // TODO: get data for InfiniteScroll via React Query
  return <InfiniteScroll />
}
