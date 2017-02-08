import React from 'react'

const SavedJobItem = ({title, id, deleteJob}) => {
 return (
   <li>
     {title} - <button onClick={ () => {deleteJob(id)} }>X</button>
   </li>
 ) 
}

export default SavedJobItem
