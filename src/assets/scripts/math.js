let score, tries, difficult, problem

score = 0
tries = 0
difficult = 1

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

function loadMultiplicationProblem() {
    problem = 'multiplication'
    firstNumber = getRndInteger(0,25*difficult)
    secondNumber = getRndInteger(0,10*difficult)
    tries += 1
    difficult = parseInt(tries/10) + 1
    document.getElementById('lblProblem').innerHTML = 'Quanto é ' + firstNumber + ' x ' + secondNumber + '?'
    document.getElementById('lblDifficult').innerHTML = 'Dificuldade: ' + difficult
    document.getElementById('inpResult').value = '' 
    document.getElementById('inpResult').focus() 
}

function solveMultiplicationProblem() {
    let obtainedResult = document.getElementById('inpResult').value
    const desiredResult = firstNumber * secondNumber

    score += obtainedResult == desiredResult ? 1 : 0
    document.getElementById('lblScore').innerText = 'Pontuação: ' + score + ' de ' + tries + ' tentativas.'

    loadMultiplicationProblem()

    return false
}

function loadFractionProblem() {
    problem = 'fraction'
    numerator = getRndInteger(1,10*difficult)
    denominator = getRndInteger(2,10*difficult)
    number = denominator * getRndInteger(1,10)
    tries += 1
    difficult = parseInt(tries/10) + 1
    document.getElementById('lblProblem').innerHTML = 'Quanto é ' + numerator + '/' + denominator + ' de ' + number + '?'
    document.getElementById('lblDifficult').innerHTML = 'Dificuldade: ' + difficult
    document.getElementById('inpResult').value = '' 
    document.getElementById('inpResult').focus() 
}

function solveFractionProblem() {
    let obtainedResult = document.getElementById('inpResult').value
    const desiredResult = (number / denominator) * numerator

    score += obtainedResult == desiredResult ? 1 : 0
    document.getElementById('lblScore').innerText = 'Pontuação: ' + score + ' de ' + tries + ' tentativas.'

    loadFractionProblem()

    return false
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
});
