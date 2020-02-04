import axios from 'axios'
import { getPlayers, getPlayer } from './remoteService'
import { json } from 'express'

jest.mock('axios')

const headtohead = {
  players: [
    {
      id: 25,
      firstname: 'Richard',
      lastname: 'Gasquet',
      shortname: 'R.GAS',
      sex: 'M',
      country: {
        picture:
          'https://i.eurosport.com/_iss_/geo/country/flag/medium/2202.png',
        code: 'FRA',
      },
      picture:
        'https://commons.wikimedia.org/wiki/File:Paris-FR-75-open_de_tennis-25-5-16-Roland_Garros-Richard_Gasquet-33.jpg?uselang=fr',
      data: {
        rank: 58,
        points: 0,
        weight: 75000,
        height: 185,
        age: 33,
        last: [1, 1, 1, 1, 1],
      },
    },
    {
      id: 24,
      firstname: 'Jo-Wilfried',
      lastname: 'Tsonga',
      shortname: 'J.TSO',
      sex: 'M',
      country: {
        picture:
          'https://i.eurosport.com/_iss_/geo/country/flag/medium/2202.png',
        code: 'FRA',
      },
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Jo-Wilfried_Tsonga_Doha.jpg/220px-Jo-Wilfried_Tsonga_Doha.jpg',
      data: {
        rank: 33,
        points: 1305,
        weight: 91000,
        height: 188,
        age: 34,
        last: [1, 1, 1, 1, 1],
      },
    },
  ],
}

describe('RemoteService', () => {
  beforeAll(() => {
    const fakePromiseData = async () => ({ data: headtohead })
    axios.get = jest.fn(fakePromiseData)
  })

  describe('getPlayers()', () => {
    test('should return an array of Player', async () => {
      const players = await getPlayers()
      expect(Array.isArray(players)).toBe(true)
      expect(players.length).toBe(2)
    })
    test('should return players sorted by id', async () => {
      const players = await getPlayers()
      expect(players[0]).toEqual(headtohead.players[1])
    })
  })

  describe('getPlayer()', () => {
    test('should return a Player from its ID', async () => {
      const player = await getPlayer(24)
      expect(player).toBeTruthy()
      expect(player).toEqual(headtohead.players[1])
    })
    test('should return null if no player is matching with the given ID', async () => {
      const player = await getPlayer(99)
      expect(player).toBe(undefined)
    })
  })
})
