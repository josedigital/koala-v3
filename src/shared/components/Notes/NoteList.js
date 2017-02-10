import React from 'react'
import NoteListItem from './NoteListItem'

const NoteList = ({jobNotes, jobId, getJobNote}) => {
  console.log('NoteList fired======')
  const notes = jobNotes.length > 0 ? jobNotes.map( (note) => <NoteListItem key={note._id} note={note} jobId={jobId} getJobNote={getJobNote} /> ) : <p>You have no saved notes for this job.</p>
  return (
    <div className="Note__list">
      {console.log('notelist', jobNotes)}
      {notes}
    </div>
  )
}

export default NoteList
