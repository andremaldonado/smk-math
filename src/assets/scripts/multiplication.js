let firstNumber, secondNumber, score, tries

score = 0
tries = 0

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

function loadMathProblem() {
    firstNumber = getRndInteger(0,25)
    secondNumber = getRndInteger(0,10)
    tries += 1
    document.getElementById('lblProblem').innerHTML = 'Quanto é ' + firstNumber + ' x ' + secondNumber + '?'
    document.getElementById('inpResult').value = '' 
    document.getElementById('inpResult').focus() 
}

function solveIt() {
    let obtainedResult = document.getElementById('inpResult').value
    const desiredResult = firstNumber * secondNumber

    score += obtainedResult == desiredResult ? 1 : 0
    document.getElementById('lblScore').innerText = 'Pontuação: ' + score + ' de ' + tries + ' tentativas.'

    loadMathProblem()

    return false
}

document.getElementById('inpResult').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        solveIt()
    }
});

window.onLoad = loadMathProblem()
