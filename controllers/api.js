'use strict'
var express = require('express');
var router = express.Router();
var request = require('request');

var searchTerm = '';
var searchLocation = '';

let indeedUri = "http://api.indeed.com/ads/apisearch?publisher=180200156283414&q=" + searchTerm +
    "&l= " + searchLocation + "&sort=&radius=&st=&jt=&start=&limit=25&fromage=&filter=&latlong=1&co=us&chnl=}" +
    "&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json";

var jobsArr = [];

router.get('/api/jobs/all', function(req, res, next) {
    jobsArr = [];
    // dice search   
    request({ uri: 'http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=' + searchTerm + '&city=' + searchLocation },
        function(error, response) {
            console.log("Dice Search Reponse");
            if (!error && response.statusCode === 200) {
                var resultsDice = JSON.parse(response.body);
                var resultLength = resultsDice.resultItemList.length;
                console.log("results frm dice" + resultLength);
                // insert results from dice in to jobsArr
                for (let i = 0; i < resultLength; i++) {
                    var jobDice = {
                        title: resultsDice.resultItemList[i].jobTitle,
                        company: resultsDice.resultItemList[i].company,
                        url: resultsDice.resultItemList[i].detailUrl,
                        location: resultsDice.resultItemList[i].location,
                        date: resultsDice.resultItemList[i].date
                    }
                    jobsArr.push(jobDice);
                }

                console.log("length of array after adding dice jobs" + jobsArr.length);
                console.log(jobsArr.length);

                // indeed search    
                request({ uri: indeedUri },
                    function(error, response, next) {
                        console.log("Indeed Search Reponse");
                        // console.log(response.body);                        
                        if (!error && response.statusCode === 200) {
                            var resultsIndeed = JSON.parse(response.body)
                            var resLength = resultsIndeed.results.length;

                            console.log("results frm indeed" + resLength);

                            for (let j = 0; j < resLength; j++) {
                                var jobIndeed = {
                                    title: resultsIndeed.results[j].jobtitle,
                                    company: resultsIndeed.results[j].company,
                                    url: resultsIndeed.results[j].url,
                                    location: resultsIndeed.results[j].formattedLocation,
                                    date: resultsIndeed.results[j].date
                                }
                                jobsArr.push(jobIndeed);
                            }
                            console.log("length of array after adding indeed jobs" + jobsArr.length);
                            console.log(jobsArr.length);
                            console.log("BEFORE RESPONSE" + jobsArr.length);
                            res.json(jobsArr);
                            // console.log(jobsArr);
                        } else {
                            console.log(error);
                        }
                    });

            } else {
                res.json(error);
            }
        });
});

router.get('/api/jobs/:searchTerm/:searchLocation', function(req, res, next) {
    console.log("inside keyword search helper function" + req.params.searchTerm + req.params.searchLocation);
    jobsArr = [];
   
    (req.params.searchTerm === 'all') ? searchTerm = '': searchTerm = req.params.searchTerm;
    (req.params.searchLocation === 'all') ? searchLocation = '': searchLocation = req.params.searchLocation;

    indeedUri = "http://api.indeed.com/ads/apisearch?publisher=180200156283414&q=" + searchTerm +
    "&l= " + searchLocation + "&sort=&radius=&st=&jt=&start=&limit=25&fromage=&filter=&latlong=1&co=us&chnl=}" +
    "&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json";
    // dice search   
    request({ uri: 'http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=' + searchTerm + '&city=' + searchLocation },
        function(error, response) {
            console.log("Dice Search Reponse");
            if (!error && response.statusCode === 200) {
                var resultsDice = JSON.parse(response.body);
                 if(resultsDice.count > 0){
                    var resultLength = resultsDice.resultItemList.length;
                    console.log("results frm dice" + resultLength);
                    // insert results from dice in to jobsArr
                    for (let i = 0; i < resultLength; i++) {
                        var jobDice = {
                            title: resultsDice.resultItemList[i].jobTitle,
                            company: resultsDice.resultItemList[i].company,
                            url: resultsDice.resultItemList[i].detailUrl,
                            location: resultsDice.resultItemList[i].location,
                            date: resultsDice.resultItemList[i].date
                        }
                        jobsArr.push(jobDice);
                 }
                 }//end of Dice 0 catch
                console.log("length of array after adding dice jobs" + jobsArr.length);
                console.log(jobsArr.length);
                console.log(indeedUri);
                // indeed search    
                request({ uri: indeedUri },
                    function(error, response, next) {
                        console.log("Indeed Search Reponse");
                        // console.log(response.body);                        
                        if (!error && response.statusCode === 200) {
                            var resultsIndeed = JSON.parse(response.body)
                            if (resultsIndeed.totalResults > 0){
                                var resLength = resultsIndeed.results.length;

                                console.log("results frm indeed" + resLength);

                                for (let j = 0; j < resLength; j++) {
                                    var jobIndeed = {
                                        title: resultsIndeed.results[j].jobtitle,
                                        company: resultsIndeed.results[j].company,
                                        url: resultsIndeed.results[j].url,
                                        location: resultsIndeed.results[j].formattedLocation,
                                        date: resultsIndeed.results[j].date
                                    }
                                    jobsArr.push(jobIndeed);
                                }
                                console.log("length of array after adding indeed jobs" + jobsArr.length);
                                console.log(jobsArr.length);
                                console.log("BEFORE RESPONSE" + jobsArr.length);
                                res.json(jobsArr);
                                // console.log(jobsArr);
                            }// END of 0 catch for Indeed
                        } else {
                            console.log(error);
                        }
                    });
                
            } else {
                res.json(error);
            }
        });
});

module.exports = router;