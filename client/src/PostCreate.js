import React, { useState } from 'react'
import axios from 'axios'

export const PostCreate = () => {
    const [title, setTitle] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3030/posts", { title })
            setTitle("")
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <form onSubmit={onSubmit}>
        <div className='form-group'>
            <label>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className='form-control' /> 
        </div>
        <button className='btn btn-primary'>Submit</button>
    </form>
  )
}
