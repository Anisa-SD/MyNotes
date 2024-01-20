import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tags: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tags);
        setNote({ title: "", description: "", tags: "" })
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container">
            <h3>Add a new notes</h3>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tags" name='tags' value={note.tags} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={note.title.length<5||note.description.length<5}  onClick={handleClick}>Add a new note</button>
            </form>
        </div>
    )
}

export default AddNote
