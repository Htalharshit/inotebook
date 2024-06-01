import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
export default function Noteitem(props) {
    const context= useContext(noteContext);
    const {deleteNote}= context;
    const { note,updateNote } = props;
    return (
        <div className="col-md-3 my-3">
            <div className="card">
                <div className="card-body ">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{note.description}</h6>
                    <p className="card-text">{note.tag}</p>
                    <i className="fa-solid fa-trash m-3" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-regular fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
            </div>
        
    )
}
