const axios = require('axios')


// ----------------- USERS --------------------------------

export const userHelpers = {

    saveUser: ( /*not sure what/if we need to pass in here*/ ) => {
        return axios.post('/api/user/save')
    },

    deleteUser: ( /*this will need the id*/ ) => {
        return axios.delete('/api/user/delete')
    },

}


// ----------------- JOBS --------------------------------

export const jobHelpers = {

    // ---  SAVE JOB 
    saveJob: (user, newTitle, newCompany, newUrl, newLocation, newSummary) => {
        // console.log(newCompany+"save job in helper")
        return axios.post('/api/job/save', {
            'title': newTitle,
            'url': newUrl,
            'summary': newSummary,
            'location': newLocation,
            'isHot': false,
            'status': 'new',
            'company': newCompany,
            'user': user
        })
    },

    // ---  GET JOBS 
    getJobs: (userEmail) => {
        //console.log('#38 helpers userEmail='+userEmail)//good
        return axios.get('/api/all/jobs/' + userEmail)
    },

    // ---  EDIT JOB 
    editJob: (jobId, newTitle, newUrl, newSummary, newLocation, newCompany) => {
        return axios.put('/api/job/edit', {
            
            'title': newTitle,//title is required, defined in model
            'url': newUrl,
            'summary': newSummary,
            'location': newLocation,
            'company': newCompany,
            'jobId': jobId,
        })
    },

    // ---  DELETE JOB 
    deleteJob: (user, job_id) => {
        // console.log('helper', user, job_id)//good
        return axios.put('/api/job/delete/' + user + '/' + job_id

        )
    }
}


// ----------------- NOTES --------------------------------

export const noteHelpers = {

  // --- SAVE NOTE
  saveNote: (userEmail, jobId, noteCategory, jobNote) => {
     console.log(userEmail, jobId, noteCategory, jobNote)// good
    return axios.post('/api/job/note/save', {
      'user': userEmail,
      'jobId': jobId,
      'category': noteCategory,
      'noteText': jobNote
    })
  },

  // --- GET NOTE
  getNotes: (jobId) => {
    return axios.get('/api/job/notes/'+jobId,
    )
  },

  getNote: (noteId) => {
    return axios.get('/api/job/note/'+noteId)
  },

  // --- EDIT NOTE
  editNote: (noteId, currentNoteValue, editedCategory) => {
    return axios.put('/api/job/note/edit', {
      'category': editedCategory,
      'noteText': currentNoteValue,
      'noteId': noteId
    })
  },

  // --- DELETE NOTE
  deleteNote: (jobId, noteId) => {
    return axios.post('/api/job/note/delete', {
      'Jobs_id': jobId,
      'Jobs_Notes_id': noteId
    })
  },

}

// ----------------- TESTING --------------------------------

export function jobsApi() {
    return axios.get('/api/jobs/all')
}
export function jobsApiSearch(searchTerm, searchLocation) {
  
    return axios.get('/api/jobs/' + searchTerm + '/' + searchLocation)
}

export function checkUser(username) {
    return axios.get(`/api/user/check/${username}`)
}

export function createUser(profile) {
    console.log(profile)
    return axios.post('/api/user/create', profile)
}



// check for empty objects
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}
