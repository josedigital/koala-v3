import React, {Component} from 'react'
import TextArea from '../Forms/TextArea'
import Select from '../Forms/Select'

class NewNote extends Component {
  constructor (props) {
    super(props)

    this.state = {
      content: '',
      jobid: '',
      category: ''
    }
    this.handleCategory = this.handleCategory.bind(this)
    this.handleContent = this.handleContent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleCategory (e) {
    this.setState({
      category: e.target.value
    })
  }

  handleContent (e) {
    this.setState({
      content: e.target.value,
      jobid: this.props.jobId
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.saveNote(this.state.content, this.state.jobid, this.state.category)
    this.setState({ content: '', jobid: '', category: '' })
  }

  render () {
    return (
      <div className="Newnote Cardnone">
        <form onSubmit={ this.handleSubmit }>
          <TextArea
            label='Write your note below'
            name='noteText'
            controlFunction={this.handleContent}
            content={this.state.content} />
            <p><strong>Select a Note Category:</strong></p>
          <Select 
            name='category'
            controlFunction={this.handleCategory}
            selectedValue={this.state.category}
            options={['Position Research','Company Information', 'Project Highlights', 'Interview Questions']} />
          <button type="submit">
            Create Note
          </button>
        </form>
      </div>
    )
  }
}

export default NewNote
