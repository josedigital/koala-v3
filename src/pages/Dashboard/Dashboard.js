import React, {Component} from 'react'
import { Link } from 'react-router'
import {browserHistory} from 'react-router';

import Header from './Header'
import SavedJobsList from '../../shared/components/SavedJobsList/SavedJobsList'
import SearchResults from '../../shared/components/Search/SearchResults'
import NewNote from '../../shared/components/Notes/NewNote'
import NoteList from '../../shared/components/Notes/NoteList'
import Note from '../../shared/components/Notes/Note'
import NoteEditor from '../../shared/components/Notes/NoteEditor'
import CustomJob from '../../shared/components/CustomJob/CustomJob'

import AuthService from '../../utils/AuthService'
import { checkUser, createUser, isEmpty, jobHelpers, noteHelpers, getGlassdoorInfo } from '../../utils/helpers'

import extlink from './img/external-link.png'



const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'


class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: props.profile,
      saved_jobs: [],
      status: REQUEST,
      message: '',
      search_visible: false,
      add_job: false,
      job_notes: [],
      current_note: [],
      job_details: [],
      glassdoorInfo: {}
    }

    
    this.getSavedJobs = this.getSavedJobs.bind(this)
    this.saveJob = this.saveJob.bind(this)
    this.deleteJob = this.deleteJob.bind(this)
    this.showHideSearch = this.showHideSearch.bind(this)
    this.showHideAddJob = this.showHideAddJob.bind(this)
    this.viewJob = this.viewJob.bind(this)
    this.saveNote = this.saveNote.bind(this)
    this.editNote = this.editNote.bind(this)
    this.editRefresh = this.editRefresh.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
    this.getJobNotes = this.getJobNotes.bind(this)
    this.getJobNote = this.getJobNote.bind(this)
    this.getJobDetails = this.getJobDetails.bind(this)
    this.logout = this.logout.bind(this)
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
      if(this.state.search_visible)
      {
        this.setState({search_visible : false})
      }
      this.getJobDetails(nextProps.params.jobid)
      this.getJobNotes(nextProps.params.jobid)
      this.editRefresh(nextProps.params.jobid)

    }
    if (nextProps.params.noteid) {
      this.getJobNote(nextProps.params.noteid)
    }
  }
  
  getJobDetails (jobId) {
    jobHelpers.getJobDetails(jobId)
      .then( (response) => {
        console.log(response.data.title)
        this.setState({
          job_details: response.data
        })
      })
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

      browserHistory.push('/dashboard');
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
      .then( (response) => { 
        this.setState({
          job_notes: response.data.Notes
        })
        this.getJobNotes(jobId)
      })
  }

  editNote (noteId, content, category) {
    noteHelpers.editNote(noteId, content, category)
      .then( (response) => { 
        this.props.params.noteid = undefined
      })
  }

  editRefresh (jobId) {
    this.getJobNotes(jobId)
  }

  deleteNote (jobId, noteId) {
    noteHelpers.deleteNote(jobId, noteId)
      .then( (response) => { console.log(response) })
  }

  showHideSearch (e) {
    e.preventDefault()
    this.setState({
      search_visible: !this.state.search_visible
    })
  }

  showHideAddJob (e) {
    e.preventDefault()
    this.setState({
      add_job: !this.state.add_job
    })
  }

  showHideAddJob2 () {
    this.setState({
      add_job: false
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
      });this.showHideAddJob2();
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
        <Header auth={this.props.auth} logout={this.logout} profile={this.state.profile} seeSearch={this.showHideSearch} addJob={this.showHideAddJob} />
        <div className="Page-wrap">
          <main role="main">
            <div className="container">



              <div className="Job_header">
                {
                  this.props.params.jobid
                    ? <div><h3 className="Job__title h1">{this.state.job_details.title} @ {this.state.job_details.company} <a href={this.state.job_details.url} className="Icon__link" target="_blanks"><img src={extlink} className="Icon__img" alt="view job at site" /></a></h3></div>
                    : null
                }
              </div>

             
              <div className="Grid top Dashboard__content">
                <div className="Cell three">
                  <div className="Cardnone">
                    {
                      this.state.status == REQUEST ? this.loading() : <SavedJobsList jobs={this.state.saved_jobs} viewJob={this.viewJob} deleteJob={this.deleteJob} getJobNotes={this.getJobNotes} />
                    }
                  </div>
                  
                </div>
                <div className="Cell six">                  
                    
                    {
                      this.state.search_visible
                        ? <SearchResults saveJob={this.saveJob} classes={'Search animated fadeInDown'} />
                        : null
                    }
                    {
                      this.state.add_job
                        ? <CustomJob profile={this.props.profile} saveJob={this.saveJob} visible={this.showHideAddJob}classes={'Search animated fadeInDown'} />
                        : null
                    }


                    {
                      this.props.params.noteid
                        ? <NoteEditor note={this.state.current_note} jobId={this.props.params.jobid} editNote={this.editNote} editRefresh={this.editRefresh}/>
                        : <NewNote saveNote={this.saveNote} jobId={this.props.params.jobid} />
                    }
                    
                </div>


                <div className="Cell three">
                  {
                    this.props.params.jobid
                      ? <NoteList jobNotes={this.state.job_notes} jobId={this.props.params.jobid} getJobNote={this.getJobNote} />
                      : null
                  }
                  
                </div>
              </div>{/* /.Grid */}
        

            </div>{/*<!-- /.container -->*/}



          </main>
        </div>{/*<!-- /.Page-wrap -->*/}


      {/* /.Dashboard */}
      </div>


    )
  }
}

export default Dashboard
