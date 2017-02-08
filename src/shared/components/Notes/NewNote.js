import React, {Component} from 'react'
import TextArea from '../Forms/TextArea'

class NewNote extends Component {
  constructor (props) {
    super(props)

    this.state = {
      content: '',
      jobid: '',
      category: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }


  

  handleChange (e) {
    this.setState({
      content: e.target.value,
      jobid: this.props.jobId,
      category: 'testcat'
    })
  }

  handleClick (e) {
    this.props.saveNote(this.state.content, this.state.jobid, this.state.category)
    this.setState({ content: '', jobid: '' })
  }

  render () {
    return (
      <div>
        <TextArea 
          label="Add Note"
          name="new-note"
          content={this.state.content}
          controlFunction={this.handleChange} />
          
        <button onClick={ this.handleClick }>Save Note</button>
      </div>
    )
  }
}

export default NewNote
