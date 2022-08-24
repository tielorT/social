import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';


function PostCard({ posts, user }) {
    const history = useHistory();

 
   const  onClick = (e) => {
        history.push('/post/'+e)
    }
  
        return(
            <div className='cards flex-wrap'>
            {(posts || []).map((post) => (
             
            <div className='card text-left bg-outline-success' style={postStyle} key={post._id} onClick={() => {onClick(post._id)}}>
                <div className='card-body' style={{padding: '10px'}}>
                    <div style={{display:"flex flex-column"}}>
                        <div>
                          <p style={{fontSize: '16px'}}>{post.title}</p>
                        </div>
                        <img src={post.imgUrl+post._id} alt={'post picture'} style={{ maxWidth: '80%', maxHeight: '280px'}}/>
                    </div>
                    
                    <div className='mt-2'> 
                        {post.tags.map((tag) => (
                        <span className='btn btn-outline-success' key={tag} style={{margin:'5px',fontSize: '10px'}}>{tag}</span>
                        ))}
                    </div>
                    <span style={{fontSize:'15px'}}>posted:{moment(post.createdAt).fromNow()}</span><br />

                <img src={'https://green-discussions-post-images.s3.us-east-2.amazonaws.com/public/profilePictures/'+post.postedBy} 
                     alt={'profile picture'} 

                     className='rounded-circle mr-1 mt-2' style={{ height: '40px', width: '40px'}} /> 
                    <span style={{fontSize: '15px',marginRight:'5px'}}> {post.username}</span>
                   </div> 
            </div>

          ))}
           </div> 
        )
}

export default PostCard;


const postStyle = {
    backgroundColor: '#F4E8FF',
    borderBottom: '1px solid #28A745',
    maxWidth: '300px',
    padding: "0px",
    margin: '10px',
    cursor: 'pointer'
}

