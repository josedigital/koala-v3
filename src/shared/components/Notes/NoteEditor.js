import React from 'react'
// import {noteHelpers} from '../../../utils/helpers'

export default class NoteEditor extends React.Component {
  constructor(props){
    super(props);
    this.state={
      editing: false,
      content: '',
      noteId:'',
      noteCategory: ''
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.startEditing = this.startEditing.bind(this);
		this.finishEditing = this.finishEditing.bind(this);
		this.newChanges = this.newChanges.bind(this);
		this.renderEdit = this.renderEdit.bind(this);
		this.renderNoteToEdit = this.renderNoteToEdit.bind(this);
    this.getPropNote = this.getPropNote.bind(this)
	}

  componentWillReceiveProps (nextProps) {
    this.getPropNote();
    console.log(nextProps)
  }

  handleEdit (e) {
    e.preventDefault()
    this.props.editNote(this.props.note._id, this.state.content, this.props.note.category)
    console.log("----Note Updated to database----")
  }

  finishEditing (e) {
    this.setState({
      editing: false
    })
    this.handleEdit (e);
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
      <div className="textarea" onClick={this.startEditing}>
        {this.state.content}
      </div>
    )
  }

  getPropNote () {
    console.log('note props------', this.props.note)
    this.setState({
      content: this.props.note.noteText,
      noteId: this.props.note._id,
      noteCategory: this.props.note.category
    })
  }

  render () {
    return (
      <div>
        {this.state.editing ? (this.renderEdit()) : (this.renderNoteToEdit())}
      </div>
    )
  }
}

