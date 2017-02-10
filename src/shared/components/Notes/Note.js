import React from 'react'

const Note = ({note}) => {
  return (
    <div className="Card">
      {note.noteText}
    </div>
  )
}

export default Note
