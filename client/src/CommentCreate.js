import React, {useState} from 'react'
import axios from 'axios'

const CommentCreate = ({ postID }) => {
    const [content, setContent] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`http://127.0.0.1:4040/posts/${postID}/comments`, {
                content
            })
            setContent('')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label>New Comment</label>
                <input value={content} onChange={e => setContent(e.target.value )} className='form-control' />
            </div>

            <button className='btn btn-primary'>Submit</button>
        </form>
    </div>
  )
}

export default CommentCreate