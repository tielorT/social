import React, { useState } from 'react';

function Comment(props){

  const [comment, setComment] = useState('');
  const {handleCommentSubmit} = props;

    return(
      <div className=' mt-3' style={{textAlign:'left'}}>
          <div className='card ' style={{padding:'5px',margin:'6px'}}>
            
             <div className='card-body'>
                <textarea name='comment' className='form-control' placeholder='Add a new comment'
                onChange={e => setComment(e.target.value)} value={comment}></textarea>
             </div>
             <button className='btn btn-success w-25 m-2 ' onClick={() => {
               handleCommentSubmit(comment)
               setComment('')
             }}>Comment</button>
          </div>
        </div>

    )

};

export default Comment;