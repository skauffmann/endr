import request from 'supertest'
import * as service from './remoteService'
import server from './server'

jest.mock('./remoteService')
describe('Server', () => {
  beforeEach(() => {
    service.getPlayers.mockClear()
    service.getPlayer.mockClear()
  })
  describe('/players', () => {
    test('should call remoteService.getPlayers', async () => {
      service.getPlayers.mockReturnValueOnce([{ id: 24, lastname: 'Tsonga' }])
      const response = await request(server).get('/players')
      expect(service.getPlayers).toHaveBeenCalledTimes(1)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([{ id: 24, lastname: 'Tsonga' }])
    })
    test('should return a 500 error if retreiving the remote json failled', async () => {
      service.getPlayers.mockRejectedValue(new Error())
      const response = await request(server).get('/players')
      expect(service.getPlayers).toHaveBeenCalledTimes(1)
      expect(response.statusCode).toBe(500)
    })
  })

  describe('/players/$id', () => {
    test('should return a Player from its ID by calling remoteService.getPlayer()', async () => {
      service.getPlayer.mockReturnValueOnce({ id: 24, lastname: 'Tsonga' })
      const response = await request(server).get('/players/24')
      expect(service.getPlayer).toHaveBeenCalledTimes(1)
      expect(service.getPlayer).toHaveBeenCalledWith(24)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({ id: 24, lastname: 'Tsonga' })
    })
    test('should return null if no player is matching with the given ID', async () => {
      service.getPlayer.mockReturnValueOnce(undefined)
      const response = await request(server).get('/players/24')
      expect(response.statusCode).toBe(404)
    })
    test('should return a 500 error if retreiving the remote json failled', async () => {
      service.getPlayer.mockRejectedValue(new Error())
      const response = await request(server).get('/players/24')
      expect(service.getPlayer).toHaveBeenCalledTimes(1)
      expect(response.statusCode).toBe(500)
    })
  })
})
