'use strict'

// Support, independent functions

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

export { 
  getRndInteger 
}
