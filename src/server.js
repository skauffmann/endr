import express from 'express'
import http from 'http'
import { getPlayers, getPlayer } from './remoteService'

const app = express()

// End point to retreive tennis player stats
app.get('/players', async function(req, res) {
  try {
    const players = await getPlayers()
    res.status(200).json(players)
  } catch (err) {
    res
      .status(500)
      .json(generateError('REMOTE_API_UNAVAILABLE', 'Remote api unavailable'))
  }
})

// End point to retrieve the stats of a tennis player from his ID
app.get('/players/:id', async function(req, res) {
  const playerId = Number(req.params.id)
  try {
    const player = await getPlayer(playerId)
    if (player) return res.status(200).json(player)
    return res
      .status(404)
      .json(generateError('PLAYER_NOT_FOUND', 'Player not found'))
  } catch (err) {
    res
      .status(500)
      .json(generateError('REMOTE_API_UNAVAILABLE', 'Remote api unavailable'))
  }
})

function generateError(code, message) {
  return {
    errors: [{ error: { code, message } }],
  }
}

export default app
