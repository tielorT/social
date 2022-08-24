import React, {useState, useEffect } from 'react';
import axios from 'axios';
import AddComment from './AddComment';

function Comments({ user }) {
    const [comments, setComments] = useState([]);

   
     console.log(user)
    const handleCommentSubmit = (data) => {
        const id = window.location.href.substring(window.location.href.lastIndexOf('/')+ 1)
        const comment = {
            body: data,
            postId: id,
            username: user.username,
            postedBy: user.attributes.sub
        };
        axios.post('http://localhost:5000/comments/add', comment)
             .then(res => getComments())
             
    }

    const onClick =() => {
        window.location = '/login'
    }

    const getComments = () => {
        axios.get("http://localhost:5000/comments/post/"+window.location.href.substring(window.location.href.lastIndexOf('/')+ 1))
             .then(res => {
                 setComments(res.data)
             });     

    }

    const deleteComment =(comment) => {
        if(comment.postedBy === user.attributes.sub){
        axios.delete('http://localhost:5000/comments/'+ comment._id)
             .then(res => {
                getComments()
             });
            }

    }
    
    useEffect(() => {
        getComments()
    }, [])
        return(
            <div className='container mt-3'>
               {  user ? <AddComment handleCommentSubmit={handleCommentSubmit}/> : 
                                    <div className='btn btn-success m-2' onClick={() => onClick()}>Login to leave a comment</div>}
               <div  style={{maxWidth:'700px'}}>
                    {comments.map((comments) => (
                        <div className='card text-left ' style={{borderLeft: '1px solid #e5e5e5', borderBottom: '1px solid #28A745', margin: '10px'}}> 
                              <div className='card-header' style={{borderBottom:'1px solid #28A745'}}>
                              { user ? <img src={'https://green-discussions-post-images.s3.us-east-2.amazonaws.com/public/profilePictures/'+comments.postedBy} className='rounded-circle mr-1 mt-2' style={{ height: '40px', width: '40px'}}/> : ''}
                                  {comments.username}
                              </div>
                              <div className='card-body'>
                                <p>{comments.body}</p>
                              </div>
                              <div className="d-flex flex-row-reverse " style={{ justifyContent:'right'}}>
                                  <div className='dropdown'>
                                    <button className='btn dropdown-toggle' type='button' id='dropDownButton' style={{ maxWidth: '30px'}} data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                        </svg>
                                    </button>
                                    <div className='dropdown-menu' aria-labelledby='dropDownButton'>
                                       { user ? user.attributes.sub === comments.postedBy ? <button className='dropdown-item' onClick={() => {deleteComment(comments)}}>delete comment</button> : <a></a> : null }
                                    </div>
                                    </div>
                               </div>
                         </div>
                    ))}
                </div>
            </div>
        )
}

export default Comments;