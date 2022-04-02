const express = require("express")
const cors = require("cors")
const axios = require("axios")
const {randomBytes} = require("crypto")

const app = express()
app.use(cors())
app.use(express.json())

const posts = {}

app.get("/posts", (req, res) => {
    res.status(200).json(posts)
})

app.post("/posts", async (req, res) => {
    const id = randomBytes(4).toString("hex") 
    const {title} = req.body

    posts[id] = {
        id, title
    }

    await axios.post("http://localhost:8080/events", {type: "PostCreated", data: {id, title}})

    return res.status(201).json(posts[id])
})

app.post("/events", (req, res) => {
    console.log("Received Event", req.body.type)
    return res.status(200).json({status: "OK"})
})

app.listen(3030, () => {
    console.log("Posts service started on port 3030")
})