// Multiplication

function loadMultiplication() {
  reset()
  document.getElementById('question').style.display = 'block'
  loadMultiplicationProblem()
}

function loadMultiplicationProblem() {
  problem = 'multiplication'
  firstNumber = getRndInteger(0,parseInt(25*difficult))
  secondNumber = getRndInteger(0,parseInt(10*difficult))
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

function loadFraction() {
  reset()
  document.getElementById('question').style.display = 'block'
  loadFractionProblem()
}

function loadFractionProblem() {
  problem = 'fraction'
  numerator = getRndInteger(1,parseInt(10*difficult))
  denominator = getRndInteger(2,parseInt(10*difficult))
  number = denominator * getRndInteger(1,parseInt(10*difficult))
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
