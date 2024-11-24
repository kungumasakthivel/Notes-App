import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EditNote() {
    const nav = useNavigate()
    const {id} = useParams()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const putNote = async(e) => {
        e.preventDefault();
        const note = {title, description, category}
        const res = await fetch(`https://notes-app-h8kr.onrender.com/notes/${id}`,
            {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            }
        )
        if(!res.ok) {
            alert('Error in editing note with id: ' + id + '\nPlease fill all the fields');
        }
        if(res.ok) {
            nav('/')
        }

    }
  return (
    <div>
      <h2>Edit Note</h2>
      <form>
        <input 
            placeholder='Enter Title' onChange={(e) => setTitle(e.target.value)}
            defaultValue={title} type='text'
        />
        <br/>
        <textarea placeholder='Description' defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br/>
        <select onChange={(e) => setCategory(e.target.value)}>
            <option defaultValue='other' defaultChecked>other</option>
            <option defaultValue='work'>work</option>
            <option defaultValue='personal'>personal</option>
        </select>
        <br/>
        <button onClick={putNote}>Edit note</button>
      </form>
    </div>
  )
}

export default EditNote
