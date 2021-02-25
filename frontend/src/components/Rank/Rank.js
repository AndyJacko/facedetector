import React from 'react';


const Rank = ({name, entries}) => {
  return (
    <div>
      <div className='f2 fw9'>
        {`${name}, your current entry count is...`}
      </div>      
      <div className='f1 fw9'>
        {entries}
      </div>
    </div>
  );
}

export default Rank;