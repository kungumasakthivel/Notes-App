import React from 'react'
import { useState, useEffect } from 'react'
import './ShowNotes.css'
import CreateNote from '../CreateNote/CreateNote';
import { Link } from 'react-router-dom';

function ShowNotes() {
    const [notes, setNotes] = useState([]);

    const fetchNotes = async() => {
        try {
            const res = await fetch('https://notes-app-h8kr.onrender.com/notes');
            if(!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setNotes(data);
        } catch (e) {
            alert(e);
        }
    }
    useEffect(() => {
        fetchNotes();
    }, []);

    const deleteNotes = async(id) => {
        try {
            const response = await fetch(`https://notes-app-h8kr.onrender.com/notes/${id}`, {
            method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Failed to delete note with ID: ${id}`);
            }
            // Update the state by removing the deleted note
            setNotes(notes.filter((note) => note.id !== id));
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    }

    console.log(notes);
  return (
    <div className='notes'>
      <div className='show-notes'>
        <h2>Notes</h2>
        <div>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <input value={note.title} placeholder='Enter Title' /><br/>
                        <textarea placeholder='Enter Description'>{note.description}</textarea>
                        <p>{note.category}</p>
                        <div className='date'>
                            <p>Created at: {note.created_at}</p>
                            <p>Updated at: {note.updated_at}</p>
                        </div>
                        <button onClick={() => deleteNotes(note.id)}>Delete</button>
                        <button><Link to={`/notes/${note.id}`}>Edit</Link></button>
                    </li>
                ))}
            </ul>
        </div>
      </div>
      <div className='form'>
        <CreateNote notes={notes} />
      </div>
    </div>
  )
}

export default ShowNotes
