const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const fileUpload = require('express-fileupload')
const session = require('express-session');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


//middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use(cookieParser('secret'))

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);



app.use((req, res, next) =>{
    console.log(req.session);
    console.log(req.user)
    next();
})



app.post(('/users/login'), (req,res,next) => {
    passport.authenticate('local', (err,user,info) => {
        if(err) throw err;
        if(!user) res.send('No User Exists');
        else{
            req.logIn(user, err => {
                if(err) throw err;
                res.send(req.user);
                console.log(req.user)
            })
        }
    })(req,res,next)
});

app.get(('/users/logout'), (req,res) => {
   req.logout();
   req.session.destroy((err) => {
       res.clearCookie('connect.sid', {path:'/'});

       res.send('logged out')
   });
})

app.get(('/users/user'), (req,res) => {
    res.send(req.user);
})


//routes

const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');


app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);


const uri = 'mongodb://localhost:27017/socialApp';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("mongodb database connected successfully");
});


app.listen(port, () => {
    console.log("Server is running...")
});