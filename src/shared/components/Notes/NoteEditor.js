import React from 'react'
import {noteHelpers} from '../../../utils/helpers'

export default class NoteEditor extends React.Component {
  constructor(props){
    super(props);
    this.state={
      editing: false,
      content: '',
      noteId:'',
      noteCategory: ''
    };
    this.handleSubmitEditedNote = this.handleSubmitEditedNote.bind(this);
    this.startEditing = this.startEditing.bind(this);
		this.finishEditing = this.finishEditing.bind(this);
		this.newChanges = this.newChanges.bind(this);
		this.renderEdit = this.renderEdit.bind(this);
		this.renderNoteToEdit = this.renderNoteToEdit.bind(this);
    this.getJobNote = this.getJobNote.bind(this);
	}

  componentWillMount() {
    this.getJobNote(this.props.george)
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    if (nextProps.george) {
      this.getJobNote(nextProps.george)
    }
  }
  

  getJobNote (noteId) {
    console.log(noteId)
    console.log(this.state.current_note)
    console.log(this.props.note)
    noteHelpers.getNote(noteId)
      .then( (response) => {
        console.log('this is the note', response.data)
        this.setState({
          content: response.data.noteText,
          noteId: response.data._id,
          noteCategory: response.data.category
        });console.log(this.state.content)
      })
  }

  handleSubmitEditedNote(e){
    // e.preventDefault()
    noteHelpers.editNote(this.props.note._id, this.state.content, this.props.note.category).then(function(response){
      console.log("note updated for " + this.state.noteId + " category " + this.props.note.category)
      console.log(response.data)
    }.bind(this));
  }

  finishEditing (e) {
    let editing = this.state.editing;
    this.setState({
      editing: false
    })
    this.handleSubmitEditedNote(e);
  }

  startEditing (e) {
    let editing = this.state.editing;
    this.setState({
      editing: true
    })
  }

  newChanges (e) {
    let content = e.target.value;
    this.setState({
      content: content
    })
  }

  renderEdit () {
    return (
      <div>
        <textarea autoFocus onChange={this.newChanges} value={this.state.content} onBlur={this.finishEditing} />
        <div>
          <button onClick={this.finishEditing} type="button">Finish Edit</button>
        </div>
      </div>
    )
  }

  renderNoteToEdit () {
    return (
      <span onClick={this.startEditing}>
        {this.state.content}
      </span>
    )
  }

  render () {
    return (
      <div>
        {this.state.editing ? (this.renderEdit()) : (this.renderNoteToEdit())}
      </div>
    )
  }
}

