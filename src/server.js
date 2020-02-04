import express from 'express'
import http from 'http'
import { getPlayers, getPlayer } from './localService'

const app = express()

// End point to retreive tennis player stats
app.get('/players', function(req, res) {
  res.status(200).json(getPlayers())
})

// End point to retrieve the stats of a tennis player from his ID
app.get('/players/:id', function(req, res) {
  const playerId = Number(req.params.id)
  const player = getPlayer(playerId)
  if (player) return res.status(200).json(player)
  return res.status(404).json({
    errors: [
      { error: { code: 'PLAYER_NOT_FOUND', message: 'Player not found' } },
    ],
  })
})

export default app
