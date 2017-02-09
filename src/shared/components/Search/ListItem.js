import React, { Component } from 'react';

const ListItem = ({ result, saveJob, url }) => {
	return (
		<div className="Job-list-item">
			<h4>{result.title}</h4>
			<p>Hiring Company: {result.company}</p>
			<p>{result.location}</p>
			<a href={result.url} target="_blank" value={url}>Job Description</a>
			<br />
			<button className="button button-primary" onClick={ () => { saveJob(result) } }>Save Job</button>
			<hr/>
		</div>
	)
}

export default ListItem
