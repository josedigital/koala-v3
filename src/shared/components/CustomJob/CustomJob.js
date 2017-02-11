import React from 'react'
import {jobHelpers} from '../../../utils/helpers'

class CustomJob extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      url: '',
      company: '',
      location: '',
      classes: this.props.classes
      
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    var newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
   
	}

  handleSubmit(e){
		e.preventDefault()
     this.props.saveJob(this.state)
     this.props.visible(e)
		this.setState({
			title: '',
			url: '',
      company: '',
      location: ''
		})
	}
    
  
  render () {
    return (
      <div className="Job__form">
        <div className={this.state.classes}>
        <h3 className="uppercase">Add a Job</h3>
        <h5> Have a job you want to manage that you didn't find our on list? Sure you do, everyone does, you can create a custom job below and manage it the same way. </h5>
        </div>
        

        <form onSubmit={ this.handleSubmit } className={this.state.classes}>
      
          {/* Title field */}
          <div className="form-element">
            <label htmlFor='title' className="form-label">Job Title</label>
            <input
              value={ this.state.title } 
              onChange={ this.handleChange }  
              label='Job Title'
              type='text'
              name='title'
              placeholder='' />
          </div>
              
          
          {/* URL */}
          <div className="form-element">
            <label htmlFor='url' className="form-label">URL</label>
            <input
              value={ this.state.url } 
              onChange={ this.handleChange }  
              label='Link to job posting'
              type='text'
              name='url'
              placeholder='' />
          </div>
          
          {/* Company Field */}
          <div className="form-element">
            <label htmlFor='company' className="form-label">Company</label>
            <input
              value={ this.state.company } 
              onChange={ this.handleChange } 
              label='Hiring Company'
              type='text'
              name='company'
              placeholder='' />
          </div>

          {/* Location field */}
          <div className="form-element">
            <label htmlFor='location' className="form-label">Location</label>
            <input
              value={ this.state.location } 
              onChange={ this.handleChange } 
              label='Job Location'
              type='text'
              name='location'
              placeholder='' />
          </div>

          <button type="submit">
            Save Job
          </button>

        </form>
        
      </div>
    )  
  }
  
}

export default CustomJob
