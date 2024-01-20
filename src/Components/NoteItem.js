import React,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3 mx-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text"> {note.description}</p>
                    
                   {/* <i className="fa-regular fa-eye mx-2"></i>
                    <i class="fa-regular fa-eye-slash"></i> */}
                    <i className="fa-regular fa-pen-to-square btn" onClick={()=>{updateNote(note)}}></i>
                    <i className="fa-regular fa-trash-can btn" onClick={()=>{deleteNote(note._id)}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
