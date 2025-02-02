import { useContext, useState } from "react";
import NoteContext from "./noteContext";
import alertContext from "../alert/alertContext";

const NoteState = (props) => {

    const context = useContext(alertContext);
    const {showAlert} = context;


    const host = "http://localhost:5000"
    
    const [notes, setNotes] = useState([]);

    const getNote = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
        });
        const json =await response.json();
        setNotes(json);
        
    }

    //   Add a Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({title, description, tag}),
        });
         // eslint-disable-next-line
        const note=await response.json();
        setNotes(notes.concat(note));
    }

    // Delete a note
    const deleteNote =async (id) => {
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
        });
        const json =await response.json();
        console.log(json)
        const newNotes = notes.filter((note) => {
            return (
                note._id !== id
            )
        })
        setNotes(newNotes);
        showAlert("Note Deleted Successfully", "success");
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json =await response.json();
        console.log(json)

        let newNotes= JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
        showAlert("Note Update Successfully", "success");
    }
    return (
        <NoteContext.Provider value={{ notes,getNote, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;