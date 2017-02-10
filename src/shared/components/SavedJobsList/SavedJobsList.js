import React from 'react'
import SavedJobItem from './SavedJobItem'

const SavedJobsList = ({jobs, viewJob, deleteJob, getJobNotes}) => {
  const savedJobs = jobs.length > 0 ? jobs.map( (job) => <SavedJobItem key={job._id} title={job.title} id={job._id} viewJob={viewJob} deleteJob={deleteJob} getJobNotes={getJobNotes} />) : <h4>You have no saved jobs at this time.</h4>
  return (
    <ul className="List Jobs__list">
      {savedJobs}
    </ul>
  )
}

export default SavedJobsList
