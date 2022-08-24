import Welcome from './Welcome';
import PostCard from './PostCard';
import PostModal from './PostModal';
import MainPageFilter from './MainPageFilter';
import SearchFilter from './SearchFilter';
import React, {useState, useEffect } from 'react';

function Home({ posts, user }) {
    const [filterPosts,setFilteredPosts] = useState(posts)
    useEffect(() => { setFilteredPosts(posts)}, [posts])

    const filterPost = (terms) => {
        let newArr = [];
        console.log(terms)
        if(terms.length === 0){
            setFilteredPosts(posts)
        }else{
        posts.map(post => {
              post.tags.map(tag => {
                  for(let i = 0; i <= terms.length - 1; i++){
                      if(tag === terms[i]){
                          newArr.push(post)
                      }
                  }
              })
              
          })
            setFilteredPosts([...newArr])
    }
}

    const pageFilter = (filter) => {
          
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

        const compareLikes = (a,b) => {
            a = a.likes.length;
            b = b.likes.length;
            let comparison = 0;
            if(a > b){
                comparison = 1
            }else if(a < b){
                comparison = -1
            }
            return comparison * -1;
        }


        switch(filter){
            case 'new':
                setFilteredPosts([...posts.sort(compareDates)]);
                console.log(filterPosts)
                break;
            case 'popular':
                setFilteredPosts([...posts.sort(compareLikes)]);
                break;
            case 'random':
                let shuffledPosts = filterPosts.map(value => ({ value, sort: Math.random()}))
                    .sort((a,b) => a.sort - b.sort)
                    .map(({ value}) => value);
                    setFilteredPosts([...shuffledPosts]);
                break;        
        }
    }
     
    return(
        <div>
            <Welcome user={user}/>
            <div className='container-fluid m-0'>
                <div className='mainContent'>
                    <SearchFilter filterPost={filterPost} />
                    <div className='postsContent'>
                        <PostModal user={user}/>
                        <MainPageFilter pageFilter={pageFilter}/>
                        <PostCard posts={filterPosts} user={user}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Home; 