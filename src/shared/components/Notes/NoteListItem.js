import React from 'react'
import { Link } from 'react-router'

const NoteListItem = ({note, jobId, getJobNote}) => {
  const noteid = note._id
  return (
    <li>
      <Link to={`/dashboard/${jobId}/${noteid}`}>
        {note.noteText}
      </Link>
    </li>
  )
}

export default NoteListItem
