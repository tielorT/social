const User = require('./models/user.model');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport){
    passport.use(
        new localStrategy((username, password, done) => {
             User.findOne({username: username}, (err,user) => {
                 if(err) throw err;
                 if(!user) return done(null, false); 
                 bcrypt.compare(password, user.password, (err,result) =>{
                    if(result === true){
                        return done(null, user);
                    }else {
                        console.log('no')
                        return done(null, false)
                    }
                 });
             })
        })
    );

    passport.serializeUser((user,done) => {
        done(null, user.id);
    })
    passport.deserializeUser((id,done) => {
        User.findById(id)
            .then((user) => {
                done(null,user);
            })
            .catch(err => done(err))
})

}