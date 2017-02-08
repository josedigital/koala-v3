import React from 'react'
import { Link } from 'react-router'

const SavedJobItem = ({title, id, viewJob, deleteJob}) => {
 return (
  <li>
    <Link to={`/dashboard/${id}`}>
      {title}
    </Link>
    - <button onClick={ () => {deleteJob(id)} }>X</button>
  </li>
 ) 
}

export default SavedJobItem
