import React, { Component } from 'react'

import { jobsApi, jobsApiSearch, jobHelpers } from '../../../utils/helpers.js';
import SearchForm from '../Forms/SearchForm'
import JobList from './JobList';

class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jobList: [],
      jobListEmpty: [{
        title:'You have no saved jobs'
      }],
      classes: this.props.classes
    }

    this.setSearchResults = this.setSearchResults.bind(this)      
  }


  setSearchResults (results){
    this.setState({
      jobList: results
    });
  }


  render () {
    // const profile = (this.props.profile) ? this.props.profile : ''

    return (
      <div className={this.state.classes}>
        <SearchForm setSearchResults={this.setSearchResults} />
        {<JobList jobList={this.state.jobList} saveJob={this.props.saveJob} />}
      </div>
    )
  }
}

export default SearchResults
