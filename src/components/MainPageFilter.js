import React, {useState} from 'react';

function MainPageFilter({pageFilter}){
    const [activeButton, setActiveButton] = useState('new');

    const onClick = name => {
        setActiveButton(name)
        pageFilter(name);
    }




    return(
        <div className='d-flex p-2 w-100' style={{ backgroundColor: '#F4E8FF'}}>
            <div className={ activeButton === 'new' ? 'mr-3 p-1 mainPageB active' : 'mr-3 p-1 mainPageB'} onClick={() => onClick('new')}>New</div>
            <div className={ activeButton === 'popular' ? 'mr-3 p-1 mainPageB active' : 'mr-3 p-1 mainPageB'} onClick={() => onClick('popular')}>Popular</div>
            <div className={ activeButton === 'random' ? 'mr-3 p-1 mainPageB active' : 'mr-3 p-1 mainPageB'} onClick={() => onClick('random')}>Random</div>
        </div>
    )
}

export default MainPageFilter;