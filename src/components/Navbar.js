import React from 'react';
import { Link,useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';


function Navbar({ loggedIn, setLoggedIn }) {
    const history = useHistory();

    const logOut = async () => {
        try {
            await Auth.signOut();
            setLoggedIn(false);
            window.location.href = '/login'
        } catch (error) {
            console.log('error signing out: ', error);
        }
    };
    
        
        return ( 
            <nav className='navbar navbar-expand-lg navbar-light ' style={{borderBottom: '1px solid green'}}>
                <Link to='/' className='navbar-brand' style={{color: '#28A745'}}>Green Garden</Link>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#box' aria-label='Toggle navigation' aria-expanded='false' aria-controls='box'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className="collapse navbar-collapse" id='box'> 
                    <ul className='navbar-nav ml-auto '>
                        <li className='nav-item'>
                           {!loggedIn ? <Link to="/login" className='nav-link'>Log in</Link> : <Link  className='nav-link' onClick={() => logOut()}>Log out</Link> }
                        </li>
                        <li className='nav-item'>
                           {!loggedIn ? <Link to='/' className='nav-link'>home</Link> : <Link  className='nav-link' onClick={() => history.push('/account')}>Account</Link>}
                        </li>
                    </ul>
                </div>
            </nav>   
        )
}

;export default Navbar; 