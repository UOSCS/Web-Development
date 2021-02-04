const buttonColors = ["green", "red", "yellow", "blue"]
let userClickedPattern = []
let gamePattern = []
let start = false
let level = 0

$(document).keypress(function () {
    if(!start) {
        $("#level-title").text(`Level ${level}`)
        nextSequence()
        start = true
    }
})

$(".btn").click(function () {
    const userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)

    playSound(userChosenColor)
    animatePress(userChosenColor)

    checkAnswer(userChosenColor)
})

function nextSequence() {
    userClickedPattern = []
    $("#level-title").text(`Level ${++level}`)
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)
}

function checkAnswer() {
    if(gamePattern[userClickedPattern.length - 1] == userClickedPattern[userClickedPattern.length - 1]) {
        if(gamePattern.length == userClickedPattern.length)
            setTimeout(function () {
                nextSequence();
            }, 1000);
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver()
    }
}

function startOver() {
    gamePattern = []
    start = false
    level = 0
}

function playSound(audioName) {
    const audio = new Audio(`./sounds/${audioName}.mp3`)
    audio.play()
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed")
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed")
    }, 100)
}