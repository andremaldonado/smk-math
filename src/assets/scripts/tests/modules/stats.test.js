'use strict'

import * as stats from '../../modules/stats.mjs'

describe('Calculate Final score for a', () => {

  describe('player that did not give a single correct answer', () => {

    let score = 0
    let difficult = 1

    test('and tried 0 times in 20 seconds', () => {
      let entryTime = new Date(Date.now() - 20000) 
      let tries = 0
      expect(stats.calculateFinalScore(entryTime, score, difficult, tries)).toBe(0)
    })

    test('and tried 1 time in 1 second', () => {
      let entryTime = new Date(Date.now() - 1000)  
      let tries = 1
      expect(stats.calculateFinalScore(entryTime, score, difficult, tries)).toBe(0)
    })

    test('and tried 10 times in 1 second', () => {
      let entryTime = new Date(Date.now() - 1000)  
      let tries = 10
      expect(stats.calculateFinalScore(entryTime, score, difficult, tries)).toBe(0)
    })

  })

  describe('player that answered everything right and tried 10 times', () => {
    
    let score = 10
    let tries = 10
    let difficult = 1

    test('in 10 seconds' , () => {
      let entryTime = new Date(Date.now() - 10000)  
      expect(stats.calculateFinalScore(entryTime, score, difficult, tries)).toBe(30)
    })

    test('in 20 seconds' , () => {
      let entryTime = new Date(Date.now() - 20000)  
      expect(stats.calculateFinalScore(entryTime, score, difficult, tries)).toBe(15)
    })

    test('in 50 seconds' , () => {
      let entryTime = new Date(Date.now() - 50000)  
      expect(stats.calculateFinalScore(entryTime, score, difficult, tries)).toBe(6)
    })

  })

  describe('player that tried 10 times in 10 seconds, with a difficult of 1', () => {

    let tries = 10
    let entryTime = new Date(Date.now() - 10000) 
    let difficult = 1

    test('and get right on 1 of them' , () => {
      let score = 1
      expect(stats.calculateFinalScore(entryTime, score, difficult, tries)).toBe(0)
    })

    test('and get right on 3 of them' , () => {
      let score = 3
      expect(stats.calculateFinalScore(entryTime, score, difficult, tries)).toBe(3)
    })

  })

  describe('player that answered everything right, tried 10 times in 20 seconds', () => {

    let tries = 10
    let score = 10
    let entryTime = new Date(Date.now() - 20000) 

    test('and finished with a difficult of 2' , () => {
      let difficult = 2
      expect(stats.calculateFinalScore(entryTime, score, difficult, tries)).toBe(30)
    })

    test('and finished with a difficult of 3' , () => {
      let difficult = 3
      expect(stats.calculateFinalScore(entryTime, score, difficult, tries)).toBe(45)
    })

    test('and finished with a difficult of 4' , () => {
      let difficult = 4
      expect(stats.calculateFinalScore(entryTime, score, difficult, tries)).toBe(60)
    })

    test('and finished with a difficult of 5' , () => {
      let difficult = 5
      expect(stats.calculateFinalScore(entryTime, score, difficult, tries)).toBe(75)
    })

  })

  describe('that player tried 200 times in 400 seconds, answered 100 times correctly', () => {

    let tries = 200
    let score = 100
    let entryTime = new Date(Date.now() - 400000) 

    test('and finished with a difficult of 2' , () => {
      let difficult = 2
      expect(stats.calculateFinalScore(entryTime, score, difficult, tries)).toBe(7)
    })

  })

})

describe('Calculate time spent for a', () => {

  test('player that started the game 1 minute ago', () => { 
    let userEntryTime = new Date(Date.now() - 60000)
    expect(stats.calculateTimeSpent(userEntryTime)).toBe(60) 
  })

  test('player that started the game 1 second ago', () => { 
    let userEntryTime = new Date(Date.now() - 1000)
    expect(stats.calculateTimeSpent(userEntryTime)).toBe(1) 
  })

  test('player that started the game 100 minutes ago', () => { 
    let userEntryTime = new Date(Date.now() - 6000000)
    expect(stats.calculateTimeSpent(userEntryTime)).toBe(6000) 
  })

})

describe('Calculate average time spent for a', () => {

  describe('player who tried 1 time', () => {
  
    let tries = 1

    test('in 1 second', () => {
      let userEntryTime = new Date(Date.now() - 1000)
      expect(stats.calculateAverageTimeSpent(userEntryTime,tries)).toBe(1)
    })

    test('in 30 second', () => {
      let userEntryTime = new Date(Date.now() - 30000)
      expect(stats.calculateAverageTimeSpent(userEntryTime,tries)).toBe(30)
    })

  })

  describe('player who tried 10 times', () => {
  
    let tries = 10

    test('in 1 second', () => {
      let userEntryTime = new Date(Date.now() - 1000)
      expect(stats.calculateAverageTimeSpent(userEntryTime,tries)).toBe(0.1)
    })

    test('in 30 second', () => {
      let userEntryTime = new Date(Date.now() - 30000)
      expect(stats.calculateAverageTimeSpent(userEntryTime,tries)).toBe(3)
    })

  })

})
