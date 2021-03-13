const express = require("express")
const mongoose = require("mongoose")
const ejs = require("ejs")

const app = express()

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true })
const articleSchema = new mongoose.Schema({
    title: String,
    content: String
})
const Article = mongoose.model("Article", articleSchema)

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.route("/articles")
    .get((req, res) => {
        Article.find((err, results) => {
            if(err)
                res.send(err)
            else
                res.send(results)
        })
    })
    .post((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })
        newArticle.save(err => {
            if(err)
                res.send(err)
            else
                res.send("Successfully added a new article.")
        })
    })
    .delete((req, res) => {
        Article.deleteMany(err => {
            if(err)
                res.send(err)
            else
                res.send("Successfully deleted all articles.")
        })
    })

app.route("/articles/:articleTitle")
    .get((req, res) => {
        Article.findOne({ title: req.params.articleTitle }, (err, foundArticle) => {
            if(foundArticle)
                res.send(foundArticle)
            else
                res.send("No articles matching that title was found.")
        })
    })
    .put((req, res) => {
        Article.updateOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            err => {
                if(err)
                    res.send(err)
                else
                    res.send("Successfully updated article.")
            }
        )
    })
    .patch((req, res) => {
        Article.updateOne(
            { title: req.params.articleTitle },
            { $set: req.body },
            err => {
                if(err)
                    res.send(err)
                else
                    res.send("Successfully updated article.")
            }
        )
    })
    .delete((req, res) => {
        Article.deleteOne(
            { title: req.params.articleTitle },
            err => {
                if(err)
                    res.send(err)
                else
                    res.send("Successfully deleted article.")
            }
        )
    })

app.listen(3000, () => {
    console.log("http://localhost:3000")
})