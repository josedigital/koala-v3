import React, {Component} from 'react'
import { Link } from 'react-router'
import AuthService from '../../utils/AuthService'
import styles from "./Dashboard.css";

import SearchResults from '../../shared/components/Search/SearchResults'



class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      profile: props.auth.getProfile()
    }
    // listen to profile_updated events to update internal state
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })
    
    
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


  render () {
    const { profile } = this.state
    return (
      <div className="Grid Dashboard">
        <div className="Cell four">
          left
          {this.props.auth.loggedIn ? <button href='/' onClick={this.logout.bind(this)}>logout</button> : ''}
          {/*
            this.state.status == REQUEST ? this.loading() : <SavedJobsList jobs={this.state.saved_jobs} deleteJob={this.deleteJob} /> */
          }
          
        </div>
        <div className="Cell four">
          center
          <SearchResults />
          {/*
          <p><a href="" onClick={this.showHideSearch}>New Job Search</a></p>
          {
            this.state.search_visible
              ? <SearchResults saveJob={this.saveJob} classes={'animated fadeInDown'} />
              : null
          }
          */}
        </div>
        <div className="Cell four">
          right
        </div>
        
      </div>
    )
  }
}

export default Dashboard
