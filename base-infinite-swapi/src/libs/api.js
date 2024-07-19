/**
 * The general fetcher
 *
 * @async
 * @param {string} url
 * @returns {Promise<unknown>}
 */
export const fetchUrl = async (url) => {
  const response = await fetch(url)
  return response.json()
}
