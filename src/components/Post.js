import React, {useState, useEffect } from 'react';
import axios from 'axios';
import Comments from './Comments';
import likeButton from '../images/like.png';
import dislikeButton from '../images/dislike.png';

import Amplify, { Storage, Auth } from 'aws-amplify';

const moment = require('moment');

function Post({ user, setUser })  {
    const [post,setPost] = useState({});


    const getPost = () => {
        const url = window.location.href.substring(window.location.href.lastIndexOf('/')+ 1)
         axios.get('http://localhost:5000/posts/'+url)
             .then(res =>  setPost(res.data));

    }

  

     const  likePost = async (postId) => {
        if(user){
        axios({
            method: 'post',
            url: 'http://localhost:5000/posts/like',
            data: {
                postId: postId,
                user: user
            }

           }).then(res => getPost());
         
        }

    };
    const unLikePost = (postId) => {
        if(user){
        axios({
            method: 'post',
            url: 'http://localhost:5000/posts/unlike',
            data: {
                postId:postId,
                user: user
            }
        }).then(res => getPost());
    }
  }
   
  const deletePost = (id) => {
    axios({
        method: 'delete',
        url: 'http://localhost:5000/posts/'+id,
    }).then(res => console.log(res));
    Storage.remove(id)
           .then(result => console.log(result))
           .catch(err => console.log(err))

    window.location = '/'

   }

   useEffect(() => {
       getPost();
   }, [])
   
        
        return(
            <div>
                <div className='container ml-4 mt-5'>
                    <div className='card text-left ' style={{ border: '1px solid #28A745'}}>
                    <div className='card-header d-flex justify-content-between'>
                    <h5>{post.title}</h5>
                    </div>    
                    <div className='card-body' >
                    <div>
                        { post.imgUrl ? <img src={post.imgUrl+post._id} style={{ maxWidth: '70%', maxHeight: '40%'}}/> : null }
                    </div>
                    <div style={{ padding: '10px'}}>
                        {post.body}
                    </div>
                        <div className='mt-2 mb-0'> 
                            {(post.tags || []).map((tag) => (
                            <span className='btn btn-outline-success' style={{margin:'5px'}}>{tag}</span>
                            ))}
                        </div>
                            <span style={{fontSize:'10px'}}>posted: {moment(post.createdAt).fromNow()}</span><br />
                            <span style={{fontSize: '15px',marginRight:'5px',marginTop:'15px',display:'block'}}>by: {post.username}</span>
                        </div>
                            <div className='d-flex mt-1'>
                               <img src={likeButton} className='btn' style={{ height: '40px'}} onClick={() => likePost(post._id)} />
                                   <span className='btn'>{(post.likes || []).length}</span>
                               <img src={dislikeButton} className='btn' style={{ height: '40px'}} onClick={() => unLikePost(post._id)} />

                               { user && post.postedBy === user.attributes.sub ? <div className='dropdown ml-auto'>
                                    <button className='btn dropdown-toggle' type='button' id='dropDownButton' style={{ maxWidth: '30px'}} data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                        </svg>
                                    </button>
                                    <div className='dropdown-menu' aria-labelledby='dropDownButton'>
                                       <button className='dropdown-item' onClick={() => deletePost(post._id)}>delete post</button> 
                                    </div>
                                    </div> : null }
                            </div> 

                      </div>
                  </div>
                <Comments  user={user}/>
            </div>   
        )
}



export default Post;