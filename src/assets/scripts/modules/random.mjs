'use strict'

// Support, independent functions

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

function getRandomFloat(min, max) {
  let number = Math.random() * (max - min) + min
  return parseFloat(number.toFixed(1))
}

export { 
  getRandomInteger,
  getRandomFloat
}
