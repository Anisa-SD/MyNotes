import React, { useContext, useEffect, useRef,useState } from 'react'
import NoteItem from './NoteItem'
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNote, editNote } = context;

  useEffect(() => {
    getNote()
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id:"",etitle: "", edescription: "", etags: "" })
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etags: currentNote.tags})
  }
    const handleClick = (e) => {
      editNote(note.id,note.etitle,note.edescription,note.etags)
     // console.log(note)
      refClose.current.click();
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
  return (
    <>
      <AddNote />
      {/* edit note modal */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form className='my-3'>
                 <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etags" name='etags' value={note.etags} onChange={onChange} />
                </div>
            </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<5||note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      {/* Show existing notes */}
      <div className="row my-3">
        <h3>Your Notes</h3>
        <div className='container mx-2 d-flex'>
          {notes.length===0&&"No notes to display"}
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note}/>
        })}
        </div>
      </div>
    </>
  )
}

export default Notes
