const express = require("express")

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.post("/bmicalculator", (req, res) => {
    let num1 = Number(req.body.n1)
    let num2 = Number(req.body.n2)

    res.send(`The result of calculation is ${num1 / Math.pow(num2, 2) * 10000}`)
})

app.listen(3000, () => {
    console.log("listening localhost:3000")
})