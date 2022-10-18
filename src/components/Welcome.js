import React from 'react';


function Welcome({user}){

    return(
        <div className='container mb-5' style={{ minWidth: '100%'}}>
           
             <div className='p-3'>
                 {!user ? <h2 className='text-success mb-4'>Welcome To Green Garden!</h2> : <h2 className='text-success mb-4'>Welcome back, {user.username}</h2>}
                 <div className='d-inline-flex flex-wrap justify-content-center'>

                    <div className='card m-3' style={{width: '18rem', backgroundColor:'#F4E8FF',borderTop:'1px solid green'}}>
                      <p>A place where outside ethusiats and tree huggers can come together and talk about mother nature.</p>
                    </div>

                    { !user ? <div className='card m-3' style={{width: '18rem', backgroundColor: '#F4E8FF',borderTop:'1px solid green'}}>
                      <h5 className='card-title'>login or signup!</h5>  
                      <p>click <a href='https://tielort.github.io/login'>here</a> to begin sharing your findings with everyone.</p>
                    </div> : <div className='card m-3 d-flex justify-content-center' style={{width: '18rem', backgroundColor: '#F4E8FF',borderTop:'1px solid green'}}>
                      <p className='text-center'>dont be shy leave a post!</p>  
                    </div> }

                    
                 </div>
             </div>
        </div>
    )
}

export default Welcome