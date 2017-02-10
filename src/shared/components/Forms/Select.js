import React from 'react'

const Select = (props) => {
  return (
    <div className="form-element">
      <select 
        name={props.name}
        onChange={props.controlFunction}
        value={props.selectedValue}
        className="form-select"
      >
        <option value="">- Select a Note Category: -</option>
        {props.options.map(opt => {
          return (
            <option
              key={opt}
              value={opt}>{opt}</option>
            )
          }
        )}
      </select>
    </div>
  )
}

Select.propTypes = {
  name: React.PropTypes.string.isRequired,
  controlFunction: React.PropTypes.func.isRequired,
  selectedValue: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired
}

export default Select
