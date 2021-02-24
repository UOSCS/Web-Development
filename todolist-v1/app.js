const express = require("express")
const date = require(__dirname + "/date.js")

const app = express()
const port = 3000
const items = []
const workItems = []

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    const day = date.getDate()

    res.render("list", {
        listTitle: day,
        addedItems: items
    })
})

app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        addedItems: workItems
    })
})

app.post("/", (req, res) => {
    const item = req.body.newItem

    if(req.body.list === "Work List") {
        workItems.push(item)
        res.redirect("/work")
    } else {
        items.push(item)
        res.redirect("/")
    }
})

app.post("/work", (req, res) => {
    workItems.push(req.body.newItem)

    res.redirect("/work")
})

app.listen(port, (req, res) => {
    console.log(`Server is listening http://localhost:${port}`)
})