import React from 'react'
import { Link } from 'react-router'

import bubble from './img/bubble.png'

const NoteListItem = ({note, jobId, getJobNote}) => {
  const noteid = note._id
  return (
    <Link to={`/dashboard/${jobId}/${noteid}`} key={noteid}>
      <li className="Note Card">
        <div className="Note__bubble Grid center middle">
          <img src={bubble} alt="" class="Cell" />
        </div>
        {note.noteText}
      </li>
    </Link>
    
  )
}

export default NoteListItem
