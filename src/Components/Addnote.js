import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
export default function Addnote() {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title: "", description: "", tag: ""})
    }
    return (
        <div>
            <h1>
                Add a Note
            </h1>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" value={note.title} name="title" id="title" minLength={5} required onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" value={note.description} name="description" id="description"  minLength={5} required onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" value={note.tag} name="tag"  id="tag"  onChange={handleChange} />
            </div>
            <div className="mb-3">
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-secondary mb-3" onClick={handleClick}>Add Note</button>
            </div>
        </div>
    )
}
