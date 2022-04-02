const express = require("express")
const cors = require("cors")
const axios = require("axios")


const app = express()
app.use(cors())
app.use(express.json())

const posts = {}

const handleEvents = (type, data) => {
    if (type === "PostCreated") {
        const {id, title} = data
        posts[id] = {id, title, comments: []}
    }

    if (type === "CommentCreated") {
        const {id, content, postID, status} = data
        const post = posts[postID]
        post.comments.push({id, content, status})
    }

    if (type === "CommentUpdated") {
        const { id, postID, status, content } = data

        const post = posts[postID]
        const comment = post.comments.find(comment => {
            return comment.id == id
        })

        comment.status = status
        comment.content = content
    }
}

app.get("/posts", (req, res) => {
    return res.status(200).json(posts)
})

app.post("/events", (req, res) => {
    const { type, data } = req.body

    handleEvents(type, data)

    return res.status(201).json({status: "OK"})
})

app.listen(5050, async () => {
    console.log("Query service started on port 5050")

    const res = await axios.get("http://localhost:8080/events")

    for (let event of res.data) {
        console.log("processing event", event.type)
        handleEvents(event.type, event.data)
    }
})