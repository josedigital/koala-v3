import React from 'react'

const CheckboxOrRadio = (props) => {
  return (
    <div className="formElement">
      <label className="form-label">{props.title}</label>
        <div className="checkbox-group">
          {props.options.map(opt => {
            return (
              <label key={opt} className="form-label capitalize">
                <input
                  className="form-checkbox"
                  name={props.name}
                  onChange={props.controlFunction}
                  value={opt}
                  checked={ props.selectedOptions.indexOf(opt) > -1 }
                  type={props.type} /> {opt}
              </label>
            );
          })}
        </div>
    </div>
  )
}


CheckboxOrRadio.propTypes = {  
  title: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf(['checkbox', 'radio']).isRequired,
  name: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  selectedOptions: React.PropTypes.array,
  controlFunction: React.PropTypes.func.isRequired
};

export default CheckboxOrRadio
