import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import axios from 'axios';
import React, {useState, useEffect } from 'react';

import Routes from './components/Routes';

import backgroundImage from './images/natureBackground.jpg'

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState('')

  


  useEffect(() => {

    axios.get('http://localhost:5000/posts')
    .then(res => {
      const compareDates = (a,b) => {
        a = Date.parse(a.createdAt);
        b = Date.parse(b.createdAt);
        let comparison = 0;
        if(a > b){
            comparison = 1
        }else if(a < b){
            comparison = -1
        }
        return comparison * -1;
    }

      setPosts([...res.data.sort(compareDates)])
    })
  },[])
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})`}}>
       <Routes posts={posts} user={user} setUser={setUser}/>
    </div>
  );
}

export default App;
