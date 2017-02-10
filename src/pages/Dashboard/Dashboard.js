import React, {Component} from 'react'
import { Link } from 'react-router'

import SavedJobsList from '../../shared/components/SavedJobsList/SavedJobsList'
import SearchResults from '../../shared/components/Search/SearchResults'
import NewNote from '../../shared/components/Notes/NewNote'
import NoteList from '../../shared/components/Notes/NoteList'
import Note from '../../shared/components/Notes/Note'
import NoteEditor from '../../shared/components/Notes/NoteEditor'

import AuthService from '../../utils/AuthService'
import { checkUser, createUser, isEmpty, jobHelpers, noteHelpers } from '../../utils/helpers'
import styles from "./Dashboard.css";


const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'


class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      profile: props.auth.getProfile(),
      saved_jobs: [],
      status: REQUEST,
      message: '',
      search_visible: false,
      job_notes: [],
      current_note: []
    }
    // listen to profile_updated events to update internal state
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })


    
    this.getSavedJobs = this.getSavedJobs.bind(this)
    this.saveJob = this.saveJob.bind(this)
    this.deleteJob = this.deleteJob.bind(this)
    this.showHideSearch = this.showHideSearch.bind(this)
    this.viewJob = this.viewJob.bind(this)
    this.saveNote = this.saveNote.bind(this)
    this.getJobNotes = this.getJobNotes.bind(this)
    this.getJobNote = this.getJobNote.bind(this)
    
  }

  static contextTypes = {
    router: React.PropTypes.object
  }
  static propTypes = {
    auth: React.PropTypes.instanceOf(AuthService)
  }

  logout() {
    this.props.auth.logout()
    this.context.router.push('/login');
  }

  componentWillMount () {
    if (this.state.profile) {
      this.getSavedJobs(this.state.profile.email)
      checkUser(this.state.profile.nickname)
        .then(({data}) => {
          if (typeof data.user === 'string')
            createUser(this.state.profile)
              .then(data => console.log(data))
        })
    }
  }

  
  componentDidMount () {
    if (this.props.params.jobid) {
      this.getJobNotes(this.props.params.jobid)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.jobid) {
      this.getJobNotes(nextProps.params.jobid)
    }
    if (nextProps.params.noteid) {
      this.getJobNote(nextProps.params.noteid)
    }
  }
  

  



	saveJob (job) {
    if (this.state.profile) {
    	jobHelpers.saveJob(this.state.profile.email, job.title, job.company, job.url, job.location)//missing this.state.summary from api call
    		.then(function (response) {
          this.getSavedJobs(this.state.profile.email)
    		}.bind(this))
    } else {
    	console.log('you have to be logged in')
    	this.setState({
    		message: 'You have to login to save jobs'
    	})
    }
	}



  deleteJob (jobId) {
    const email = this.state.profile.email
    jobHelpers.deleteJob(email, jobId)
      .then(function(data) {
        this.getSavedJobs(email)
      }.bind(this));
  }


  loading () {
    this.getSavedJobs(this.state.profile.email)
    return 'content loading...'
    
  }


  // save jobs to app state
  getSavedJobs (email) {
    jobHelpers.getJobs(email).then(function(response) {
      if (response.data.Jobs !== this.state.saved_jobs) {
        this.setState({
          saved_jobs:response.data.Jobs,
          status: SUCCESS
        })
        this.render()
      }
    }.bind(this))
  }

  viewJob (jobId) {
    console.log(jobId)
  }

  saveNote (content, jobId, noteCategory) {
    console.log(content, jobId)
    noteHelpers.saveNote(this.state.profile.email, jobId, noteCategory, content)
      .then( (response) => { console.log(response) })
  }

  editNote (noteId, content, category) {
    noteHelpers.editNote(noteId, content, category)
      .then( (response) => { console.log(response) })
  }



  showHideSearch (e) {
    e.preventDefault()
    this.setState({
      search_visible: !this.state.search_visible
    })
  }

  getJobNotes (jobId) {
    console.log('getJobNotes fired')
    noteHelpers.getNotes(jobId)
      .then( (response) => {
        console.log('notes response', response)
        this.setState({
          job_notes: response.data.Notes
        })
      })
  }

  getJobNote (noteId) {
    console.log(noteId)
    noteHelpers.getNote(noteId)
      .then( (response) => {
        console.log('this is the note', response.data)
        this.setState({
          current_note: response.data
        })
      })
  }







  render () {     
    return (
      <div className="Dashboard">
        {console.log(this.props.params)}
        {
          this.props.params.jobid
            ? <h1>{this.props.params.jobid}</h1>
            : null
        }
        <div className="Grid Dashboard__content">
          <div className="Cell four">
            left
            {this.props.auth.loggedIn ? <button href='/' onClick={this.logout.bind(this)}>logout</button> : ''}
            {
              this.state.status == REQUEST ? this.loading() : <SavedJobsList jobs={this.state.saved_jobs} viewJob={this.viewJob} deleteJob={this.deleteJob} getJobNotes={this.getJobNotes} />
            }
            
          </div>
          <div className="Cell four">
            center
           
            <p><a href="" onClick={this.showHideSearch}>New Job Search</a></p>
            {
              this.state.search_visible
                ? <SearchResults saveJob={this.saveJob} classes={'animated fadeInDown'} />
                : null
            }


            {
              this.props.params.noteid
                ? <NoteEditor note={this.state.current_note} editNote={this.editNote}/>
                : <NewNote saveNote={this.saveNote} jobId={this.props.params.jobid} />
            }
            
            
          </div>
          <div className="Cell four">
            right
            {
              this.props.params.jobid
                ? <NoteList jobNotes={this.state.job_notes} jobId={this.props.params.jobid} getJobNote={this.getJobNote} />
                : null
            }
            
          </div>
        </div>
        
      </div>
    )
  }
}

export default Dashboard
