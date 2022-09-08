import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Auth, Storage } from 'aws-amplify';
import axios from 'axios';
import PostCard from './PostCard';


function Account({posts , user}) {
    const [newPicture,setNewPicture] = useState('')
    const history = useHistory();

    const filterPosts = posts => {
        if(user){
         return posts.filter(post => post.postedBy === user.attributes.sub)
        }
    }



    const onDeleteAccount = () => {
       Auth.currentAuthenticatedUser({
           bypassCache: true
       }).then(user => {
           user.deleteUser((error,data) => {
               if(error){
                   throw error;
               }

               axios({
                method: 'DELETE',
                url: 'http://localhost:5000/posts/deleteUserPosts/'+user.attributes.sub
            }).then(() =>  {
                Auth.signOut({ global: true})
            })

           });
       }).catch(err => console.log(err))
    }


    const pictureUpdate = async name => {
        const file = newPicture;
    
       await Storage.remove(name)
               .then(result => {
                   console.log(result)
                   Storage.put(name,file)
                          .then(result =>  history.go(0))
                          .catch(err => console.log(err))
            })
               .catch(err => console.log(err))
         
      };


   
    


       const userPosts = filterPosts(posts)
        return(
            <div className='container ' >
               <div className='row accountCenter'> 
                    <div className='card ' style={{marginBottom: '10px'}}>
                        <div >
                        { user ? <img className='card-img rounded-circle' src={user.attributes['custom:ImgUrl']+user.attributes.sub} style={profileImgStyle}/> : null }
                        </div>
                    <div className='card-body mt-4' >
                       <h4 style={{fontFamily: 'courier,arial,helvetica'}}>{user.username}</h4>
                       <ul style={{display: 'flex', flexDirection: 'column'}}>
                                <button class="btn btn-outline-success m-1" data-toggle='modal' data-target='#changePicture'>change profile picture</button>
                                <button class="btn btn-outline-success m-1" data-toggle='modal' data-target='#deleteAccount'>delete account</button>
                            </ul>
                    </div>
                    </div>
                     <div className='card col' >
                         <h3 style={{fontFamily: 'courier,arial,helvetica'}}>My Posts</h3>
                            <PostCard posts={userPosts} />
                        </div>
                     </div>




                    <div className='modal' id='changePicture'tabIndex='-1' role='dialog'>
                        <div className='container'>
                        <div className='modal-content mt-4'>
                            <form className='p-2'> 
                                <h2>choose file</h2>
                                <input  type='file' onChange={(e) => setNewPicture(e.target.files[0])}/>
                            </form>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-danger' data-dismiss="modal">Close</button>
                                <button type='button' className='btn btn-success' onClick={() => pictureUpdate('profilePictures/'+user.attributes.sub)}>Save Changes</button>
                            </div>
                        </div>
                        </div>
                        </div>

                    <div className='modal' id='deleteAccount' tabIndex='-1' role='dialog'>
                        <div className='container w-50'>
                        <div className='modal-content mt-4'>
                            <p>Are you Sure? You cant recover the account once deleted</p>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-danger' data-dismiss="modal">No</button>
                                <button type='button' className='btn btn-success' onClick={() => onDeleteAccount()}>Yes</button>
                            </div>
                        </div>
                        </div>
                        </div> 

                </div>
                
        )
    }
    const profileImgStyle = {
        marginTop: '10px',    
        border: '1px solid',
        borderRadius: '50%',
        width: '100px',
        height: '100px'
        }

export default Account;