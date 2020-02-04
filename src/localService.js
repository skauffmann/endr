import headtohead from '../headtohead.json'

/**
 * Return tennis player stats
 * @returns Array
 */
export const getPlayers = () =>
  [...headtohead.players].sort((a, b) => a.id - b.id)

/**
 * Return stats of a tennis player according to the given ID
 * or undefined if no player is matching
 * @param id Number Tennis player ID
 * @returns Object Tennis player stats according to the given ID
 */
export const getPlayer = id => headtohead.players.find(el => el.id === id)
