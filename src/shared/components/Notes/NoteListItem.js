import React from 'react'
import { Link } from 'react-router'

const NoteListItem = ({note, jobId, getJobNote}) => {
  const noteid = note._id
  return (
    <div className="Note Card">
      <Link to={`/dashboard/${jobId}/${noteid}`}>
        {note.noteText}
      </Link>
    </div>
  )
}

export default NoteListItem
