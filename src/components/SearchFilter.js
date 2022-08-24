import React, { Component } from 'react';

export default class SearchFilter extends Component {
    constructor(props){
        super(props);

        this.state = {
            search: [],
            posts: []
        }

    }

    removeTag(e){
        const newArr = [...this.state.search]
        const val = e;
        var index = this.state.search.indexOf(val);
        newArr.splice(index,1);
        this.setState({
            search: [...newArr]
        }, () => {
            console.log(this.state.search)
            this.props.filterPost(this.state.search)
        });

    }
    
    onClick(){

        const val = document.getElementById('searchBox').value;
            if(val && this.state.search.indexOf(val) === -1){
                this.setState({
                    search: [...this.state.search, val]
                }, () => {
                    this.props.filterPost(this.state.search);
                });
                document.getElementById('searchBox').value = '';
            }    

}
    

    render(){
        const searchTerms = this.state.search

        return(
            <div className='searchTagBar' style={{padding:'5px',overflow:'hidden'}}>
                <h3 className='text-success'>Search by tags</h3>
                <input type='text' name='search' id='searchBox' /><br />
                <button className='btn btn-success m-2' onClick={() => this.onClick()}>Search</button>
                <ul style={{listStyle: 'none',padding:'0px',display:'flex'}}>
                    {searchTerms.map((term) => (
                        <li key={term} style={searchTagsStyle} className='searchTagStyle' onClick={() => this.removeTag(term)}> 
                            {term}
                        </li>
                        
                    ))}

                </ul>
            </div>
        )
    }
}

const searchTagsStyle = {
    border: '1px solid #28A745',
    cursor: 'pointer',
    position: 'relative',
    display:'inline-block',
    padding:'5px',
    margin: '5px',
    color: '#28A745',
}