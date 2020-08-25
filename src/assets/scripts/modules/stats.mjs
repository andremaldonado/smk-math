'use strict'

function calculateFinalScore(userEntryTime, userScore, finalDifficult, userTries) {
  if (userScore == 0) return 0
  let totalTime = calculateTimeSpent(userEntryTime)
  let finalScore = (userScore/userTries*100)*(userScore/10)*(finalDifficult*3/totalTime)
  finalScore = Math.round(finalScore)
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
