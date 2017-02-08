import React, {Component} from 'react'
import { Link } from 'react-router'
import SavedJobsList from '../../shared/components/SavedJobsList/SavedJobsList'
import AuthService from '../../utils/AuthService'
import { checkUser, createUser, isEmpty, jobHelpers } from '../../utils/helpers'
import styles from "./Dashboard.css";

import SearchResults from '../../shared/components/Search/SearchResults'

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
      search_visible: false
    }
    // listen to profile_updated events to update internal state
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })


    
    this.getSavedJobs = this.getSavedJobs.bind(this)
    this.saveJob = this.saveJob.bind(this)
    this.deleteJob = this.deleteJob.bind(this)
    this.showHideSearch = this.showHideSearch.bind(this)

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
    }.bind(this));
  }



  showHideSearch (e) {
    e.preventDefault()
    this.setState({
      search_visible: !this.state.search_visible
    })
  }







  render () {
    const { profile } = this.state
     
    return (
      <div className="Grid Dashboard">
        <div className="Cell four">
          left
          {this.props.auth.loggedIn ? <button href='/' onClick={this.logout.bind(this)}>logout</button> : ''}
          {
            this.state.status == REQUEST ? this.loading() : <SavedJobsList jobs={this.state.saved_jobs} deleteJob={this.deleteJob} />
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
          
        </div>
        <div className="Cell four">
          right
        </div>
        
      </div>
    )
  }
}

export default Dashboard
