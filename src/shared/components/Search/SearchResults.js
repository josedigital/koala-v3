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
      classes: this.props.classes,
      searchform_visible: true
    }

    this.setSearchResults = this.setSearchResults.bind(this)      
  }


  setSearchResults (results){
    this.setState({
      jobList: results
    });
    this.setState({searchform_visible: false})
  }


  render () {
    // const profile = (this.props.profile) ? this.props.profile : ''

    return (
      <div>
        <h3 className="uppercase">Search Jobs</h3>
        <div className={this.state.classes}>
        {
          this.state.searchform_visible ? <SearchForm setSearchResults={this.setSearchResults} hideSearchForm={this.props.hideSearch}/> : null
        }
          
          {<JobList jobList={this.state.jobList} saveJob={this.props.saveJob} />}
        </div>
      </div>
    )
  }
}

export default SearchResults
