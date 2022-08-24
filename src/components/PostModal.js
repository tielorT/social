import React, { useState } from 'react'
import axios from 'axios';
import Modal from 'react-modal';
import TagsInput from './TagsInput';

import { Storage } from 'aws-amplify';

Modal.setAppElement('#root')

 function PostModal({user}) { 
  const [modalShow, setModalShow] = useState(false);
  const [postBody, setPostBody] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postTags, setPostTags] = useState(['nature', 'discovery']);
  const [selectedUpload, setSelectedUpload] = useState(false);

    

 
  
  const onCreatePost = () => {
    console.log(postTags )

    const post = {
      body: postBody,
      title: postTitle,
      tags: postTags,
      username: user.username,
      postedBy: user.attributes.sub
        }
    if(selectedUpload){

    axios.post('http://localhost:5000/posts/add', post)
         .then(res => { 
            fileUploadHandler('postsPictures/'+res.data._id)
          }).catch(err => console.log(err))
          }else if(!selectedUpload){
          alert('need to attach image')
          }
    }

  const fileSelectedHandler = e => {
    setSelectedUpload( e.target.files[0] )
  };

  const fileUploadHandler = name => {
    const file = selectedUpload;

    Storage.put(name, file)
           .then(result => window.location = '/')
           .catch(err => console.log(err))
  };




 



       const selectedTags = tags => setPostTags(tags);
       

     
     return(
         <div>
           <button className='btn btn-success d-block' onClick={() => user ? setModalShow(true) : alert('need to sign in')} style={{marginBottom: '10px'}} >Add Post</button>
           <Modal isOpen={modalShow} style={{backgroundColor: '#F2F3F3'}}>
             <h2>Create Post</h2>
             <form method='POST' >
               <div className='mb-2 form-group'>
                 <label>Title</label><br />
                 <input type='text' name='title' onChange={e => {setPostTitle(e.target.value) 
                                                                 console.log(postTags)}}/>
               </div>
               <div className='mb-2 form-group'>
                 <label>body</label><br />
                 <textarea style={{width:"50%",padding:"10px"}} name='body' onChange={e => setPostBody(e.target.value)} />
               </div>
               <div className='mb-2 form-group'>
               <div className='mb-2 form-group'>
                 <input type='file' onChange={e => fileSelectedHandler(e)}/>
                </div> 
                 <label>tags</label>  
                 <TagsInput go={selectedTags} /><br/>
               </div>
               <button  type='button' onClick={() => onCreatePost()} className='btn btn-success btn-block mt-4 mb-4'>create post</button>
             </form>
             <div>
               <button onClick={() => setModalShow(false)}>Close</button>
             </div>
           </Modal>
           <h3>Recent Discussions</h3>
         </div>
     );
   }

export default PostModal;
