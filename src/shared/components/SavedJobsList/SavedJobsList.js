import React from 'react'
import SavedJobItem from './SavedJobItem'

const SavedJobsList = ({jobs, deleteJob}) => {
  const savedJobs = jobs.length > 0 ? jobs.map( (job) => <SavedJobItem key={job._id} title={job.title} id={job._id} deleteJob={deleteJob} />) : <h4>You have no saved jobs at this time.</h4>
  return (
    <ul>
      {savedJobs}
    </ul>
  )
}

export default SavedJobsList
