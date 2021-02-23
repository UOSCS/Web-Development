const express = require("express")
const app = express()

const port = 3000

let items = []

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    const today = new Date()
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    const day = today.toLocaleDateString("en-US", options)

    res.render("list", {
        kindOfDay: day,
        addedItems: items
    })
})

app.post("/", (req, res) => {
    items.push(req.body.newItem)

    res.redirect("/")
})

app.listen(port, (req, res) => {
    console.log(`Server is listening http://localhost:${port}`)
})