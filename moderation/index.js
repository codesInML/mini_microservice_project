const express = require("express")
const axios = require("axios")

const app = express()
app.use(express.json())

app.post("/events", async (req, res) => {
    const { type, data } = req.body

    if (type === "CommentCreated") {
        const status = data.content.includes("orange") ? "rejected" : "approved"
        await axios.post("http://localhost:8080/events", {
            type: "CommentModerated",
            data: {
                id: data.id,
                postID: data.postID,
                status,
                content: data.content
            }
        })
    }

    return res.status(200).json({status: "OK"})

})

app.listen(6060, () => {
    console.log("Moderation service started on port 6060")
})