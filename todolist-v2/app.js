const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true })

const itemSchema = new mongoose.Schema({
    name: String
})

const Item = mongoose.model("Item", itemSchema)

app.get("/", function (req, res) {
    Item.find({}, function (err, result) {
        if(err)
            console.log(err)
        else
            res.render("list", { listTitle: "Today", newListItems: result })
    })
})

app.post("/", function (req, res) {
    const itemName = req.body.newItem

    Item.insertMany({ name: itemName }, function (err, response) {
        if(err)
            console.log(err)
        else {
            console.log(response)
            res.redirect("/")
        }
    })
})

app.post("/delete", function (req, res) {
    Item.deleteOne({ _id: req.body.checkbox }, function (err) {
        if(err)
            console.log(err)
        else
            res.redirect("/")
    })
})

app.get("/work", function (req,res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems })
})

app.get("/about", function (req, res) {
    res.render("about")
})

app.listen(3000, function () {
    console.log("Server started on http://localhost:3000")
})
