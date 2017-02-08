var express = require('express');
var router = express.Router();
// var User = require('../model/model');//to be deleted

//----NEW -- bringing in all three tables
var User = require('../model/User')//change name to User
var Job = require('../model/Job')
var Note = require('../model/Note')


// ----------------- USERS --------------------------------
//- save user
router.post('/api/user/save', function( req, res ) {});
//- delete user
router.delete('/api/user/delete', function( req, res ) {});




// ----------------- JOBS --------------------------------
// --- SAVE JOB & PUSH IT'S REF ID TO THE USER TABLE

router.post('/api/job/save', function( req, res ) {
  var newJob = new Job (req.body)
  newJob.save(function(error, doc){
    //console.log(doc)//good
    if (error){res.send(error)}
    else{
      User.findOneAndUpdate({email: req.body.user},{ $push:{'Jobs':doc.id}},{ new:true},
      function(error, newDoc){
        if (error){res.send(error)}
          else {res.send(newDoc)}
      })
    }
  })
});

// --- GET ALL JOBS FROM USER 
router.get ( '/api/all/jobs/:userEmail', function( req, res ) {
  var userEmail = req.params.userEmail;
// console.log("#53Controler req.body = " + req.body.userEmail)//good
	User.findOne(
  {'email': userEmail})
.populate("Jobs")
    .exec(function(err, doc){
      if (err) {
        res.send(error)
      } else { res.send(doc) }
  })
});



//- edit Job
router.put('/api/job/edit', function( req, res ) {
  var jobId = req.body.jobId
  var title = req.body.title
  var url = req.body.url
  var summary = req.body.summary
  var location = req.body.location
  var company = req.body.category
  console.log("controlerEditJOb= "+jobId, title, company)//working
 Job.findOneAndUpdate({'_id' : jobId,}, 
    { 'title': title, 
      'url': url,
      'summary': summary,
      'location': location,
      'company': company
    },{new:true},function(err, Doc){
      if (err) {res.send(err)} 
      else {res.send(Doc)}
    })
}),

// --- DELETE JOB ** NEED TO CLEAR REF IN USER ARRAY

router.put('/api/job/delete/:user/:job_id', function( req, res ) {
  var job_id = req.params.job_id
  var userEmail = req.params.user
  //console.log(job_id, userEmail)
    Job.remove({ '_id': job_id})
    .exec(function(err, jobDoc){
      if (err) {res.send(err)} 
        else {
          User.update({'email': userEmail},
          {$pull: {Jobs: job_id}})
          .exec(function (err, userArray){
            if (err){res.send (err)}
              else {res.send(jobDoc + userArray)}
          })
      }
    });
});





// ---  create the api
router.get('/api/testing', function(req, res, next) {
  res.json({test: 'testings'});
});

router.get('/api/user/check/:username', function(req, res, next) {
  var username = req.params.username;
  User.findOne({ username: username }, function (err, user) {
    console.log('findOne ============')
    if (err)
      return done(err);
    if (user)
      res.json({user: user});
    else {
      res.json({user: 'no user'});
    }
  });

});


router.post('/api/user/create', function (req, res, next) {
  console.log(req.body);
  var newUser = new User();
  newUser.id = req.body.identities[0].user_id;
  newUser.token = req.body.clientID;
  newUser.username = req.body.nickname;
  newUser.email = req.body.email;

  newUser.save(function (err) {
    if (err)
      throw err;
    res.json({newUser});
    // return done(null, newUser);
  });

});

// ----------------- NOTES --------------------------------

// --- save Note
router.post('/api/job/note/save', function( req, res ) {
  // console.log(Jobs_Notes_NoteText)
  var newNote = new Note (req.body);
    newNote.save(function(err, doc){
      //console.log(doc)//good
      if (err){res.send(err)}
        else{Job.findOneAndUpdate({'_id':req.body.jobId},{ $push:{'Notes': doc.id}},{new:true}, function(error, newDoc){
          if (error) {res.send(error)}
            else {res.send(newDoc)}
        })
      } 
    })
})

// --- GET NOTES FOR ONE JOB
router.get('/api/job/notes/:job_id', function( req, res ) {
var job_id = req.params.job_id
console.log(job_id)
	Job.findOne({ '_id': job_id})
  .populate('Notes')
  .exec(function(error, doc){
      if (error) {res.send(err)}
       else {res.send(doc)}
  })
});

router.get('/api/job/note/:noteid', function (req, res) {
  var noteid = req.params.noteid
  console.log(noteid)
	Note.findOne({'_id' : noteid}, function (err, obj) {
    if (err) {res.send(err)} 
      else {res.send(obj)}
    }) 
});

// --- edit Note
router.put('/api/job/note/edit', function( req, res ) {
  var noteId = req.body.noteId
  var newNote = req.body.noteText
  var categoryEdit = req.body.category
  console.log("controler = "+noteId, newNote, categoryEdit)//working
 Note.findOneAndUpdate({'_id' : noteId,}, 
    {'noteText': newNote, 
      'category': categoryEdit
    },{new:true},function(err, newDoc){
      if (err) {res.send(err)} 
      else {res.send(newDoc)}
    })
}),

// --- DELETE NOTE AND  REMOVE REF IN JOB ARRAY

// --- this is the origin delete with orphans --  can be deleted
// router.put('/api/job/note/delete', function( req, res ) {
//   var Jobs_id = req.body.Jobs_id;
//   var Jobs_Notes_id = req.body.Jobs_Notes_id;
//   var user = req.body.user
//   console.log(Jobs_id, Jobs_Notes_id,user)
//    Note.remove({'_id':Jobs_Notes_id})
//    .exec(function (error, doc){
//      if (error){res.send (error)}
//       else { res.send (doc)}
//    })
// }),

router.post('/api/job/note/delete', function( req, res ) {
  var Jobs_id = req.body.Jobs_id;
  var Jobs_Notes_id = req.body.Jobs_Notes_id;
  //var user = req.body.user//not needed
  //console.log(Jobs_id, Jobs_Notes_id,user)
   Note.findOneAndRemove({'_id':Jobs_Notes_id},
    function (error, removeddoc){
        if (error){res.send (error)}
          else {
            Job.update({_id: Jobs_id}, 
              {$pull: {Notes: Jobs_Notes_id}})
                .exec(function (err, jobsArray){
                  if (error){res.send (error)}
                    else { res.send (jobsArray + removeddoc)}
                      })
            }
      }) 
})

module.exports = router;


                 
