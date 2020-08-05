let score, tries, difficult, problem

function loadMultiplication() {
  reset()
  document.getElementById('question').style.display = 'block'
  loadMultiplicationProblem()
}

function loadFraction() {
  reset()
  document.getElementById('question').style.display = 'block'
  loadFractionProblem()
}

function reset() {
  score = 0
  tries = 0
  difficult = 1
  clearResults()
  document.getElementById('lblScore').innerText = 'Pontuação: ' + score + ' de ' + tries + ' tentativas.'
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

function clearResults() {
    document.getElementById('inpResult').value = '' 
    document.getElementById('inpResult').focus() 
}

function loadMultiplicationProblem() {
    problem = 'multiplication'
    firstNumber = getRndInteger(0,parseInt(25*difficult))
    secondNumber = getRndInteger(0,parseInt(10*difficult))
    tries += 1
    document.getElementById('lblProblem').innerHTML = 'Quanto é ' + firstNumber + ' x ' + secondNumber + '?'
    clearResults()
}

function solveMultiplicationProblem() {
    updateScore(
      document.getElementById('inpResult').value,
      firstNumber * secondNumber
    )
    loadMultiplicationProblem()
    return false
}

function loadFractionProblem() {
    problem = 'fraction'
    numerator = getRndInteger(1,parseInt(10*difficult))
    denominator = getRndInteger(2,parseInt(10*difficult))
    number = denominator * getRndInteger(1,parseInt(10*difficult))
    tries += 1
    document.getElementById('lblProblem').innerHTML = 'Quanto é ' + numerator + '/' + denominator + ' de ' + number + '?'
    clearResults()
}

function solveFractionProblem() {
    updateScore(
      document.getElementById('inpResult').value,
      (number / denominator) * numerator
    )
    loadFractionProblem()
    return false
}

function updateScore(obtainedResult, desiredResult) {
    score += obtainedResult == desiredResult ? 1 : 0
    document.getElementById('lblScore').innerText = 'Pontuação: ' + score + ' de ' + tries + ' tentativas.'
    updateDifficult()
}

function updateDifficult() {
    difficult = (score / tries) * (parseInt(tries/10) + 1)
    document.getElementById('lblDifficult').innerHTML = 'Dificuldade: ' + difficult.toFixed(2)
}

document.getElementById('inpResult').addEventListener("keyup", function(event) {
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
