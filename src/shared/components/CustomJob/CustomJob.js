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
    // let userEmail = this.props.profile.email
		// jobHelpers.saveJob(userEmail, this.state.title, this.state.url, this.state.location, this.state.company)
    //   .then(function () {
    //     console.log("Custom job sent to DB")
		//   }.bind(this));
		this.setState({
			title: '',
			url: '',
      company: '',
      location: ''
		})
	}
    
  
  render () {
    return (
      <div className="customJob">
       
        <h2>Add a custom Job</h2>

        <form onSubmit={ this.handleSubmit }>
      
          {/* Title field */}
          <div className="form-element">
            <label htmlFor='title' className="form-label">Job Title</label>
            <input
              value={ this.state.title } 
              onChange={ this.handleChange }  
              label='Job Title'
              type='text'
              name='title'
              placeholder='Job Title' />
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
              placeholder='www.myjobposting.com' />
          </div>
          
          {/* Company Field */}
          <div className="form-element">
            <label htmlFor='company' className="form-label">Company</label>
            <textarea
              value={ this.state.company } 
              onChange={ this.handleChange } 
              label='Hiring Company'
              name='company'
              placeholder='Horchata Design Syndicate' />
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
              placeholder='El Paso, TX' />
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
