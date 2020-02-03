import request from 'supertest'
import * as service from './localService'
import server from './server'

jest.mock('./localService')
describe('Server', () => {
  describe('/players', () => {
    test('should call localService.getPlayers', async () => {
      service.getPlayers.mockReturnValueOnce([{ id: 24, lastname: 'Tsonga' }])
      const response = await request(server).get('/players')
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([{ id: 24, lastname: 'Tsonga' }])
    })
  })

  describe('/players/$id', () => {
    test('should return a Player from its ID', async () => {
      service.getPlayer.mockReturnValueOnce({ id: 24, lastname: 'Tsonga' })
      const response = await request(server).get('/players/24')
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({ id: 24, lastname: 'Tsonga' })
    })
    test('should return null if no player is matching with the given ID', async () => {
      service.getPlayer.mockReturnValueOnce(undefined)
      const response = await request(server).get('/players/24')
      expect(response.statusCode).toBe(404)
    })
  })
})
