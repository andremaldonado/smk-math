'use strict'

function calculateFinalScore(userEntryTime, userScore, finalDifficult, userTries) {
  let totalTime = calculateTimeSpent(userEntryTime)
  let finalScore = parseInt(((userScore^2 * finalDifficult) / (userTries*totalTime))*100)
  return finalScore
}

function calculateTimeSpent(userEntryTime) {
  return (Date.now() - userEntryTime)/1000
}

function calculateAverageTimeSpent(userEntryTime, tries) {
  return calculateTimeSpent(userEntryTime) / tries
}

export { 
  calculateFinalScore, 
  calculateTimeSpent, 
  calculateAverageTimeSpent 
}
