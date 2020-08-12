let score, tries, difficult, problem, timer, entryTime

// Support, independent functions

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
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
  clearTimeout(timer)
  tick(0)
}

function tick(time) {
  time++;
  document.getElementById('question__timer').innerText = 'Tempo: ' + time
  timer = setTimeout('tick(' + time + ')', 1000)
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
      break;
    case 'fraction':
      solveFractionProblem()
      break;
  }
}

function calculateFinalScore() {
  let totalTime = (Date.now() - entryTime)/1000
  let finalScore = parseInt(((score^2 * difficult) / (tries*totalTime))*100)
  return finalScore
}

function showFinalScore(finalScore) {
  document.getElementById('final-score__value').innerHTML = finalScore
  document.getElementById('question').style.display = 'none'
  document.getElementById('final-score').style.display = 'flex'
  document.getElementById('final-score__facebook-share').href = document.getElementById('final-score__facebook-share').href.replace('{{title}}', 'SMK Math - Minha pontuação foi de: ' + finalScore)
  document.getElementById('final-score__twitter-share').href = document.getElementById('final-score__twitter-share').href.replace('{{title}}', 'SMK Math - Minha pontuação foi de: ' + finalScore)
  document.getElementById('final-score__whatsapp-share').href = document.getElementById('final-score__whatsapp-share').href.replace('{{title}}', 'SMK Math - Minha pontuação foi de: ' + finalScore)
}

// Starting and DOM functions

document.getElementById('header__multiplication').addEventListener('click', function(event) { loadMultiplication() })
document.getElementById('header__fraction').addEventListener('click', function(event) { loadFraction() })

document.getElementById('question__result').addEventListener('keyup', function(event) {
  if (event.keyCode === 13) solveIt()
})

document.getElementById('question__next').addEventListener('click', function(event) {
  solveIt()
})

document.getElementById('question__finish').addEventListener('click', function(event) {
  showFinalScore(calculateFinalScore())
})

reset()
