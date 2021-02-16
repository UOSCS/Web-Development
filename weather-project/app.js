const { resolveNaptr } = require("dns")
const express = require("express")
const https = require("https")

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    const query = req.body.city
    const apiKey = "5e8fe340c19b29ef280229f6a0faf87d"
    const unit = "metric"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`

    https.get(url, (response) => {
        console.log(response.statusCode)

        response.on("data", (data) => {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const weatherIcon = weatherData.weather[0].icon
            
            res.write(`<p>The weather is currently ${weatherDescription}</p>`)
            res.write(`<h1>The temperature in ${query} is ${temp} degrees Celcius.</h1>`)
            res.write(`<img src="https://openweathermap.org/img/w/${weatherIcon}.png">`)
            res.send()
        })
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})