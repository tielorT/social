import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';


function Login({ onSignin  }) {
    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();

        const login = async () => {
            try {
                await Auth.signIn(username, password);
                history.push('/')
                onSignin()
            } catch (error) {
                alert('Sorry, make sure user is confirmed or info is correct');
            }
        }

        return(
            <div className='row h-100 flex-column justify-content-center align-items-center mt-5'>
              <form method='POST' style={formBorder} >
                  <div className='mb-3'><h3>Log In</h3></div>
                  <div className='mb-2 form-group'> 
                      <label className='mb-0'>Username</label><br />
                      <input type='text' name='username' onChange={e => setUsername(e.target.value)}/>
                  </div>
                  <div className='mb-2 form-group'>
                   <label className='mb-0' >Password</label><br/>
                   <input type='text' name='password' placeholder='At least 6 characters' onChange={e => setPassword(e.target.value)}/>
                 </div>
                 <input type='button ' value='Login' onClick={login} className='btn btn-success btn-block mt-4' />
              </form>
              <div>
                 Don't have an account? <button onClick={() => window.location = '/signup'}>Sign Up</button>
                </div>
           </div>
        )
    }


const formBorder = {
    border: 'solid #343A40 1px',
    padding: '10px',
    marginBottom: '5px'
  }

export default Login; 