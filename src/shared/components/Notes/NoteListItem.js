import React from 'react'

const NoteListItem = ({note}) => {
  return (
    <li>
      {note.noteText}
    </li>
  )
}

export default NoteListItem
