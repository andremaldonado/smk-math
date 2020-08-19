'use strict'

import * as stats from './modules/stats.mjs'
import * as random from './modules/random.mjs'

let score, tries, difficult, problem, timer, time, entryTime

// Multiplication

let firstNumber, secondNumber

function loadMultiplication() {
  reset()
  document.getElementById('question').style.display = 'block'
  loadMultiplicationProblem()
}

function loadMultiplicationProblem() {
  problem = 'multiplication'
  firstNumber = random.getRndInteger(0,parseInt(25*difficult))
  secondNumber = random.getRndInteger(0,parseInt(10*difficult))
  tries += 1
  document.getElementById('question__problem').innerHTML = 'Quanto é ' + firstNumber + ' x ' + secondNumber + '?'
  clearResults()
}

function solveMultiplicationProblem() {
  updateScore(
    document.getElementById('question__result').value,
    firstNumber * secondNumber
  )
  loadMultiplicationProblem()
  return false
}

// Fraction

let numerator, denominator, number

function loadFraction() {
  reset()
  document.getElementById('question').style.display = 'block'
  loadFractionProblem()
}

function loadFractionProblem() {
  problem = 'fraction'
  numerator = random.getRndInteger(1,parseInt(10*difficult))
  denominator = random.getRndInteger(2,parseInt(10*difficult))
  number = denominator * random.getRndInteger(1,parseInt(10*difficult))
  tries += 1
  document.getElementById('question__problem').innerHTML = 'Quanto é ' + numerator + '/' + denominator + ' de ' + number + '?'
  clearResults()
}

function solveFractionProblem() {
  updateScore(
    document.getElementById('question__result').value,
    (number / denominator) * numerator
  )
  loadFractionProblem()
  return false
}

// General functions

function reset() {
  score = 0
  tries = 0
  difficult = 1
  entryTime = Date.now()
  clearResults()
  document.getElementById('question__difficult').innerHTML = 'Dificuldade: ' + difficult.toFixed(2)
  document.getElementById('final-score').style.display = 'none'
  document.getElementById('question__score').innerText = 'Pontuação: ' + score + ' de ' + tries + ' tentativas.'
}

function startTimer() {
  clearInterval(timer)
  time = 0
  timer = window.setInterval(function() {
    time = time + 1
    document.getElementById('question__timer').innerText = 'Tempo: ' + time
  }, 1000)
}

function clearResults() {
  document.getElementById('question__timer').innerText = 'Tempo: 0'
  document.getElementById('question__result').value = '' 
  document.getElementById('question__result').focus()
  startTimer()
}

function updateScore(obtainedResult, desiredResult) {
  score += obtainedResult == desiredResult ? 1 : 0
  document.getElementById('question__score').innerText = 'Pontuação: ' + score + ' de ' + tries + ' tentativas.'
  updateDifficult()
}

function updateDifficult() {
  difficult = (score / tries) * (parseInt(tries/10) + 1)
  document.getElementById('question__difficult').innerHTML = 'Dificuldade: ' + difficult.toFixed(2)
}

function solveIt() {
  switch (problem) {
  case 'multiplication':
    solveMultiplicationProblem()
    break
  case 'fraction':
    solveFractionProblem()
    break
  }
}

function showFinalScore(finalScore, totalTimeSpent, averageTimeSpent, finalDifficult, userQuestions, userTries) {
  document.getElementById('final-score__value').innerHTML = finalScore
  document.getElementById('final-score__time-spent').innerHTML = parseInt(totalTimeSpent)
  document.getElementById('final-score__average-time-spent').innerHTML = parseInt(averageTimeSpent)
  document.getElementById('final-score__difficult').innerHTML = finalDifficult.toFixed(2)
  document.getElementById('final-score__questions').innerHTML = userQuestions
  document.getElementById('final-score__answers').innerHTML = userTries
  document.getElementById('question').style.display = 'none'
  document.getElementById('final-score').style.display = 'flex'
  document.getElementById('final-score__facebook-share').href = document.getElementById('final-score__facebook-share').href.replace('{{title}}', 'SMK Math - Minha pontuação foi de: ' + finalScore)
  document.getElementById('final-score__twitter-share').href = document.getElementById('final-score__twitter-share').href.replace('{{title}}', 'SMK Math - Minha pontuação foi de: ' + finalScore)
  document.getElementById('final-score__whatsapp-share').href = document.getElementById('final-score__whatsapp-share').href.replace('{{title}}', 'SMK Math - Minha pontuação foi de: ' + finalScore)
}

// Starting and DOM functions

document.getElementById('header__multiplication').addEventListener('click', function() { loadMultiplication() })
document.getElementById('header__fraction').addEventListener('click', function() { loadFraction() })

document.getElementById('question__result').addEventListener('keyup', function(event) {
  if (event.keyCode === 13) solveIt()
})

document.getElementById('question__next').addEventListener('click', function() {
  solveIt()
})

document.getElementById('question__finish').addEventListener('click', function() {
  showFinalScore(stats.calculateFinalScore(entryTime, score, difficult, tries), stats.calculateTimeSpent(entryTime), stats.calculateAverageTimeSpent(entryTime, tries), difficult, tries, score)
})

reset()
