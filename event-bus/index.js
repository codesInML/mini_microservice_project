const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const events = []

app.post("/events", async (req, res) => {
    try {
        const event = req.body
        events.push(event)
        
        await axios.post("http://localhost:3030/events", event)
        await axios.post("http://localhost:4040/events", event)
        await axios.post("http://localhost:6060/events", event)
        await axios.post("http://localhost:5050/events", event)

        return res.status(200).json({status: "OK"})
    } catch (error) {
        console.log("An error occured")
        return res.send("Error encountered")
    }
})

app.get("/events", (req, res) => {
    return res.status(200).json(events)
})

app.listen(8080, () => {
    console.log("Events Listening on port 8080")
})