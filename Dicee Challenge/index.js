const randomNumber1 = Math.ceil(Math.random() * 6)
const randomNumber2 = Math.ceil(Math.random() * 6)
let player1 = document.querySelectorAll("img")[0]
let player2 = document.querySelectorAll("img")[1]
let headTag = document.querySelector("h1")
let result = "Draw"

// player1.setAttribute("src", "./images/dice" + randomNumber1 + ".png")
// player2.setAttribute("src", "./images/dice" + randomNumber2 + ".png")

if (randomNumber1 > randomNumber2)
    result = "Player2 Wins!"
else if (randomNumber2 > randomNumber1)
    result = "Player1 Wins!"

player1.src = `./images/dice${randomNumber1}.png`
player2.src = `./images/dice${randomNumber2}.png`
headTag.innerText = result

console.log(headTag)
console.log(player1)
console.log(player2)