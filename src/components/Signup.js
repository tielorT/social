import React, { useState } from 'react';
import { Auth, Storage } from 'aws-amplify';

function Signup() {
   const [username,setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmedPassword] = useState('')
   const [email,setEmail] = useState('');
   const [profilePicture, setProfilePicture] = useState(false);
   const [ImgUrl,setImgUrl] = useState('https://green-discussions-post-images.s3.us-east-2.amazonaws.com/public/profilePictures/')


    async function signUp() {
        if(profilePicture && confirmPassword === password){

        try {
            const user  = await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                   'custom:ImgUrl': ImgUrl
                }
            }).then(res => fileUploadHandler('profilePictures/'+res.userSub))
        } catch (error) {
            alert('sorry error signing up')
            console.log('error signing up:', error);
        }
    }else if(password !== confirmPassword){
        alert('passwords do not match')
    }else{ 
          alert('need to upload profile picture')
        }
    }

    const fileUploadHandler = name => {
        const file = profilePicture;
    
        Storage.put(name, file)
               .then(result => window.location = '/login')
               .catch(err => console.log(err))
      };
    
    

        return(

           <div className='row h-100 flex-column justify-content-center align-items-center mt-5'>
              <form  style={formBorder} >
                  <div className='mb-3'><h3> Please Create Account</h3></div>
                  <div className='mb-2 form-group'>
                      <label className='mb-0' >Username</label>< br/>
                      <input type='text' name='username' onChange={e => setUsername(e.target.value)}/>
                  </div>
                  <div className='mb-2 form-group'>
                      <label className='mb-0'>Email</label><br />
                      <input type='text' name='email' onChange={e => setEmail(e.target.value)}/>
                  </div>
                  <div className='mb-2 form-group'>
                   <label className='mb-0' >Password</label><br/>
                   <input type='text' name='password' placeholder='At least 6 characters' onChange={e => setPassword(e.target.value)}/>
                 </div>
                 <div className='mb-4 form-group'>
                   <label className='mb-0' >Re-enter Password</label><br/>
                   <input type='text' name='passwordMatch'  onChange={e => setConfirmedPassword(e.target.value)}/>
                 </div>
                 <div className='mb-2 form-group'>
                    <h3 className='pb-2' style={{borderBottom:'1px solid #28A745'}}>upload profile picture</h3><br />
                    <input type='file' name='profilePicture' onChange={e => {
                        setProfilePicture(e.target.files[0])
                        
                    }
                        }/>
                 </div>
                 <input type='button' value='Create account' onClick={() => signUp()} className='btn btn-success  btn-block mt-4' />
              </form>
              <div>
                 Already have an account? <button onClick={() => window.location = '/signin'}>Sign In</button>
                </div>
           </div>
        )
}

const formBorder = {
    border: 'solid #343A40 1px',
    padding: '10px',
    marginBottom: '5px'
  }


export default Signup;
