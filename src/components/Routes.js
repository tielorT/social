import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import { Auth } from 'aws-amplify';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';


import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer'
import Account from './Account';
import Login from './Login';
import Signup from './Signup';
import Post from './Post';

 function Routes({ posts, user, setUser }) {
     const [loggedIn, setLoggedIn] = useState(false);

     const  assesLogInStatus = async () => {
         await Auth.currentAuthenticatedUser()
             .then(sess => {
                 console.log('logged in');
                 setLoggedIn(true);
                 Auth.currentUserInfo().then(userInfo => {
                     setUser(userInfo)
                     console.log(userInfo)
                 })
             })
             .catch(() => {
                 console.log('not logged in')
                 setLoggedIn(false);
             });
     }

     useEffect(() => {
         assesLogInStatus()
     }, [])

        return (
            <Router>
                <Navbar  loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                <div style={{ paddingBottom: '100px'}}>
                    <Route path='/'  exact render={() => <Home  posts={posts} user={user} />}/>
                    <Route path='/login' render={() => <Login onSignin={assesLogInStatus} />}/>
                    <Route path='/signup' render={() => <Signup  onSignUp={assesLogInStatus}/>} />
                    <Route path='/post/:id' render={() => <Post user={user} setUser={setUser}/>} />
                    <Route path='/account' render={() => <Account  posts={posts} user={user} setUser={setUser}/> } />
                </div>
                <Footer />
            </Router>
        )
}

export default Routes;