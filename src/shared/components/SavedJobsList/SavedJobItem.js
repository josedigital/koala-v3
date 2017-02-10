import React from 'react'
import { Link } from 'react-router'

const SavedJobItem = ({title, id, viewJob, deleteJob, getJobNotes}) => {
  
  return (
    
    <Link to={`/dashboard/${id}`}>
      <li className="Card">
        {title}
        - <button onClick={ () => {deleteJob(id)} }>X</button>
      </li>
    </Link>
      
    
  ) 
}

export default SavedJobItem
