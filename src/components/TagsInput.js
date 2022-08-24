import React from 'react';

import '../index.css'

function InputTag (props) {

    const [tags, setTags] = React.useState([
      'nature',
      'discovery'
    ]);
    
    const removeTag = (i) => {
      const newTags = [ ...tags ];
      newTags.splice(i, 1);
  

      setTags(newTags);
    };
  
    const inputKeyDown = (e) => {
      const val = e.target.value;
      if (e.key === 'Enter' && val) {
        if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
          return;
        }
        setTags([...tags, val]);
        e.target.value = null;
      } else if (e.key === 'Backspace' && !val) {
        removeTag(tags.length - 1);
      }
     props.go([...tags, val]);
    };
  
  
    return (
      <div className="input-tag">
        <ul className="input-tag__tags">
          { tags.map((tag, i) => (
            <li key={tag}>
              {tag}
              <button type="button" onClick={() => { removeTag(i); }}>+</button>
            </li>
          ))}
          <li className="input-tag__tags__input"><input type="text" onKeyDown={inputKeyDown}  /></li>
        </ul>
      </div>
    );
  }

  export default InputTag;