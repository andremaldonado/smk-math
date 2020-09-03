'use strict'

import * as random from '../../modules/random.mjs'

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      }
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      }
    }
  },
})

describe('Get a random', () => {

  test('integer between 1 and 10', () => {
    let number = random.getRandomInteger(1, 10)
    expect(number).toBeWithinRange(1, 10)
  })

  test('integer between 1 and 1', () => {
    let number = random.getRandomInteger(1, 1)
    expect(number).toBe(1)
  })

  test('float between 1 and 10', () => {
    let number = random.getRandomFloat(1,10)
    expect(number).toBeWithinRange(1,10)
  })

  test('float between 10 and 100', () => {
    let number = random.getRandomFloat(10,100)
    expect(number).toBeWithinRange(10,100)
  })

  test('float between 1000 and 1000', () => {
    let number = random.getRandomFloat(1000,1000)
    expect(number).toBe(1000)
  })

})
