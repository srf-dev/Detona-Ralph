const state = {
    view:{
        // Vão ser usadas para alterações visuais
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        livesCount: 3,
    },
    actions:{
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
    },
}

function countDown(){
    state.values.curretTime--
    state.view.timeLeft.textContent = state.values.curretTime

    if(state.values.curretTime <= 0){
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert(`Game Over! O seu resultado foi: ${state.values.result}`)
    }
}

function playSound(){
    let audio = new Audio("./src/audios/CorrectSound-Effect.mp3")
    audio.volume = 0.2
    audio.play()
}

// Sorteia o quadrado "inimigo"
function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random()*9)
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id
}

function moveEnemy(){
    // A cada momento chama a função randomNumber
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function addListenerHitBox(){
    state.view.squares.forEach((square => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
               state.values.result++
               state.view.score.textContent = state.values.result
               state.values.hitPosition = null 
               playSound()
            }else{
                state.values.livesCount--

                if(state.values.livesCount > 0){
                    state.view.lives.textContent = 'x' + state.values.livesCount 
                }
                else{
                    alert(`Game Over! O seu resultado foi: ${state.values.result}`)
                    clearInterval(state.actions.countDownTimerId)
                    clearInterval(state.actions.timerId)
                }
            }
        })
    }))
}

function init(){
    moveEnemy()
    addListenerHitBox()
}

init()