const express = require("express")
const app = express()

const port = 3000

app.get("/", (req, res) => {
    res.send("Hello world!")
})

app.get("/contact", (req, res) => {
    res.send("Contact me at: akrnrnak@gmail.com")
})

app.get("/about", (req, res) => {
    res.send("UOSCS")
})

app.listen(port, () => {
    console.log(`now listening ${port}`)
})