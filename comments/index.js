const express = require("express")
const cors = require("cors")
const {randomBytes} = require("crypto")
const axios = require("axios")

const app = express()
app.use(cors())
app.use(express.json())

const commentsByPostId = {}

app.get("/posts/:postID/comments", (req, res) => {
    return res.status(200).json(commentsByPostId[req.params.postID] || [])
})

app.post("/posts/:postID/comments", async (req, res) => {
    const commentID = randomBytes(4).toString("hex")
    const {content} = req.body

    const comments = commentsByPostId[req.params.postID] || []
    comments.push({ id: commentID, content, status: "pending" })

    commentsByPostId[req.params.postID] = comments

    await axios.post("http://localhost:8080/events", {
        type: "CommentCreated",
        data: {
            id: commentID,
            content,
            postID: req.params.postID,
            status: "pending"
        }
    })

    return res.status(201).json(comments)
})

app.post("/events", async (req, res) => {
    console.log("Received Event", req.body.type)

    const { type, data } = req.body

    if (type === "CommentModerated") {
        const { postID, id, status, content } = data

        const comments = commentsByPostId[postID]

        const comment = comments.find(comment => {
            return comment.id == id
        })
        comment.status = status

        await axios.post("http://localhost:8080/events", {
            type: "CommentUpdated",
            data: {
                id,
                status,
                postID,
                content
            }
        })
    }
    return res.status(200).json({status: "OK"})
})

app.listen(4040, () => {
    console.log("Comments service started on port 4040")
})