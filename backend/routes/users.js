const router = require('express').Router();
const express = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const uploadFile = require("../services/ImageUpload");



// router.route('/user', {withCredentials: true}).get((req,res) => {
//     res.send(req.user);
// })
router.route('/').get((req,res,) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: '+ err))
});



 router.route('/add').post( async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const hashedPassword = await  bcrypt.hash(req.body.password, 10);
    const password = hashedPassword;

    const newUser = new User({username,email,password});

    newUser.save()
           .then(() => res.json('User added!'))
           .catch(err => res.status(400).json('Error: '+err))
});

router.route('/:id').get((req,res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: '+err))
});

router.route('/:id').delete((req,res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/update/:id').post((req,res) => {
    User.findById(req.params.id)
        .then(user => {
            user.name = req.body.name;
            user.email = req.body.email; 

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error '+err))
        })
        .catch(err => res.status(400).json('Error: '+err ));
});

router.route("/add-profile-picture").post((req, res) => {
  
    uploadFile(req.files.FormFieldName)
  });

// router.route('/login', {withCredentials: true}).post((req,res,next) => {
//     passport.authenticate('local', (err,user,info) => {
//         if(err) throw err;
//         if(!user) res.send('No User Exists');
//         else{
//             req.logIn(user, err => {
//                 if(err) throw err;
//                 res.send('Successfully Authenticated');
//                 console.log(req.user)
//             })
//         }
//     })(req,res,next)
// })



module.exports = router;