const express = require("express")
const request = require("request")
const https = require("https")

const app = express()
const port = 3000

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data)
    const url = "https://us1.api.mailchimp.com/3.0/lists/bf7b09b974"
    const options = {
        method: "POST",
        auth: "leegwanh:900c6ce723b82f51ecdc80e355da0497-us1"
    }
    const request = https.request(url, options, (response) => {
        if(response.statusCode === 200)
        response.on("data", (data) => {
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end()
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})