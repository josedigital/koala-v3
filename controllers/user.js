var express = require('express');
var router = express.Router();
var User = require('../model/User');

router.get('/api/user/test', function (req, res, next) {
  res.json({you: 'are an idiot'})
})

module.exports = router;

// router.get('/api/user/check', function(req, res, next) {
  
//   res.send({user: 'user'});
//   // User.findOne({ id: profile.id }, function (err, user) {
//   //   console.log('findOne ============')
//   //   if (err)
//   //     return done(err);
//   //   if (user)
//   //     res.
//   //     return done(null, user);
//   //   else {
//   //     var newUser = new User();
//   //     newUser.id = profile.id;
//   //     newUser.token = accessToken;
//   //     newUser.username = profile.displayName;
//   //     newUser.email = profile.emails[0].value;

//   //     newUser.save(function (err) {
//   //       if (err)
//   //         throw err;
//   //       return done(null, newUser);
//   //     });
//   //   }
//   // });

// });

    
      
        
      
    