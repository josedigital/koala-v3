import React from 'react'
import { Link } from 'react-router'

const SavedJobItem = ({title, id, viewJob, deleteJob, getJobNotes}) => {
  
  return (
    <li className="Job Card">
      <Link to={`/dashboard/${id}`}>
        {title}
      </Link>
      <button className="Close" onClick={ () => {deleteJob(id)} }>X</button>
    </li>
    
      
    
  ) 
}

export default SavedJobItem
