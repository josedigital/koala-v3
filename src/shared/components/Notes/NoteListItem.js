import React from 'react'
import { Link } from 'react-router'

const NoteListItem = ({note, jobId, getJobNote}) => {
  const noteid = note._id
  return (
    <Link to={`/dashboard/${jobId}/${noteid}`} key={noteid}>
      <div className="Note Card">
        {note.noteText}
      </div>
    </Link>
    
  )
}

export default NoteListItem
