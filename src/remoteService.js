import axios from 'axios'

const url =
  'https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json'

/**
 * Retrieve json data from a fake remote API
 */
async function fetchHeadtohead() {
  return axios.get(url).then(response => response.data)
}

/**
 * Return tennis player stats
 * @returns Array
 */
export async function getPlayers() {
  const headtohead = await fetchHeadtohead()
  return [...headtohead.players].sort((a, b) => a.id - b.id)
}

/**
 * Return stats of a tennis player according to the given ID
 * or undefined if no player is matching
 * @param id Number Tennis player ID
 * @returns Object Tennis player stats according to the given ID
 */
export async function getPlayer(id) {
  const headtohead = await fetchHeadtohead()
  return headtohead.players.find(el => el.id === id)
}
