import React, { Component } from 'react'
import ListItem from './ListItem';

const JobList = ({ jobList, saveJob }) => {
	return (
		<div className="Job-list">
			{jobList.map((result, i) => <ListItem key={i} btnText={"Save Job"} result={result} saveJob={saveJob} />)}
		</div>  
	)
}
export default JobList
