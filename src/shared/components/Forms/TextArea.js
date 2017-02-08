import React from 'react'

const TextArea = (props) => {
 return (
   <div className="form-element">
    <label htmlFor={props.name}>{props.label}</label>
     <textarea 
      name={props.name} 
      id={props.name} 
      value={props.content}
      onChange={props.controlFunction}>
     </textarea>
   </div>
 ) 
}

TextArea.propTypes = {
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  controlFunction: React.PropTypes.func.isRequired
}

export default TextArea
