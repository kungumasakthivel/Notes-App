import React, { useState } from 'react'
import './CreateNote.css'

function CreateNote({notes}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('other');
    console.log(notes.map((note) => (console.log('create ' + note.description))));

    const postNote = async(e) => {
        e.preventDefault();
        const notes = {title, description, category};
        console.log(notes);
        try{
            const res = await fetch(`https://notes-app-h8kr.onrender.com/notes`,
                {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(notes)
                }          
            );
            if(!res.ok) {
                throw new Error('Error in creating notes please check the fields')
            }
        } catch(err){
            alert(err)
        }
    }
  return (
    <div>
        <h2>Create Note</h2>
      <form>
        <input 
            defaultValue='text' placeholder='Title' 
            value={title} onChange={(e) => setTitle(e.target.value)} 
        />
        <br/>
        <textarea 
            defaultValue={description} onChange={(e) => setDescription(e.target.value)}
            type='text' placeholder='Description'
        >
        </textarea>
        <br/>
        <select onChange={(e) => setCategory(e.target.value)}>
            <option defaultValue='other' defaultChecked>other</option>
            <option defaultValue='work'>work</option>
            <option defaultValue='personal'>personal</option>
        </select>
        <br/><br/>
        <button onClick={postNote}>create note</button>
      </form>
    </div>
  )
}

export default CreateNote
