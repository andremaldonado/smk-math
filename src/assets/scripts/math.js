let score, tries, difficult, problem, timer

// Support, independent functions

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

// General DOM functions

function reset() {
  score = 0
  tries = 0
  difficult = 1
  clearResults()
  startTimer()
  document.getElementById('content__score').innerText = 'Pontuação: ' + score + ' de ' + tries + ' tentativas.'
}

function startTimer() {
  clearTimeout(timer)
  tick(0)
}

function tick(time) {
  time++;
  document.getElementById('content__timer').innerText = 'Tempo: ' + time
  timer = setTimeout('tick(' + time + ')', 1000)
}

function clearResults() {
    document.getElementById('content__difficult').value = 'Dificuldade: 1.00'
    document.getElementById('content__timer').innerText = 'Tempo: 0'
    document.getElementById('content__result').value = '' 
    document.getElementById('content__result').focus()
    startTimer()
}

function updateScore(obtainedResult, desiredResult) {
    score += obtainedResult == desiredResult ? 1 : 0
    document.getElementById('content__score').innerText = 'Pontuação: ' + score + ' de ' + tries + ' tentativas.'
    updateDifficult()
}

function updateDifficult() {
    difficult = (score / tries) * (parseInt(tries/10) + 1)
    document.getElementById('content__difficult').innerHTML = 'Dificuldade: ' + difficult.toFixed(2)
}

// Multiplication

function loadMultiplication() {
  reset()
  document.getElementById('content__question').style.display = 'block'
  loadMultiplicationProblem()
}

function loadMultiplicationProblem() {
    problem = 'multiplication'
    firstNumber = getRndInteger(0,parseInt(25*difficult))
    secondNumber = getRndInteger(0,parseInt(10*difficult))
    tries += 1
    document.getElementById('content__problem').innerHTML = 'Quanto é ' + firstNumber + ' x ' + secondNumber + '?'
    clearResults()
}

function solveMultiplicationProblem() {
    updateScore(
      document.getElementById('content__result').value,
      firstNumber * secondNumber
    )
    loadMultiplicationProblem()
    return false
}

// Fraction

function loadFraction() {
  reset()
  document.getElementById('content__question').style.display = 'block'
  loadFractionProblem()
}

function loadFractionProblem() {
    problem = 'fraction'
    numerator = getRndInteger(1,parseInt(10*difficult))
    denominator = getRndInteger(2,parseInt(10*difficult))
    number = denominator * getRndInteger(1,parseInt(10*difficult))
    tries += 1
    document.getElementById('content__problem').innerHTML = 'Quanto é ' + numerator + '/' + denominator + ' de ' + number + '?'
    clearResults()
}

function solveFractionProblem() {
    updateScore(
      document.getElementById('content__result').value,
      (number / denominator) * numerator
    )
    loadFractionProblem()
    return false
}

// Starting functions

document.getElementById('content__result').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        switch (problem) {
            case 'multiplication':
                solveMultiplicationProblem()
                break;
            case 'fraction':
                solveFractionProblem()
                break;
        }
    }
})

reset()
