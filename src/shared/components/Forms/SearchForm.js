import React, { Component } from 'react'

import { jobsApi, jobsApiSearch } from '../../../utils/helpers.js';
import TextInput from '../Forms/TextInput';

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyWord : '',
      location: '',
      searchResults: []
    }

    this.handleKeyWordSearch = this.handleKeyWordSearch.bind(this);
    this.handleLocationSearch = this.handleLocationSearch.bind(this);
    this.handleSubmitGetJobs = this.handleSubmitGetJobs.bind(this);
       
    }

    handleKeyWordSearch(e){
      this.setState({
        keyWord: e.target.value
      })
    }


    handleLocationSearch(e){
      this.setState({
        location: e.target.value
      })
    }

    handleSubmitGetJobs(e){
      e.preventDefault();
      var term;
      var location;
      var results;      

      (this.state.keyWord == '') ? term = 'all' : term = this.state.keyWord;
      (this.state.location == '') ? location = 'all' : location = this.state.location;

      jobsApiSearch(term, location).then(function(response) {
          this.setState({searchResults: response.data})
          results = this.state.searchResults;
      // send results returned to the parent component
          this.props.setSearchResults(results);
      }.bind(this));       
    }



    render() {
      // const profile = (this.props.profile) ? this.props.profile : ''

      return (
        <div className="Search-form">
          <form onSubmit={ this.handleSubmitGetJobs} className="Job-search-form">
            <TextInput 
            classes='test'
            label='Title'
            inputType='text'
            name='keyWord'
            controlFunction={this.handleKeyWordSearch}
            content={this.state.keyWord}
            placeHolder='Search For Keyword'/>

            <TextInput 
            label='Location'
            inputType='text'
            name='location'
            controlFunction={this.handleLocationSearch}
            content={this.state.location}
            placeHolder='Austin,TX'/>

            <div className="form-element">
              <button type="submit">Search</button>
            </div>
          </form>  
        </div>
      )
    }
}

export default SearchForm
