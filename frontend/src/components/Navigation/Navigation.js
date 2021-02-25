import React from 'react';


const Navigation = ({onRouteChange, isSignedIn}) => {
  return (
    <div>
    {isSignedIn
    ? <nav className='right'>
        <p onClick={() => onRouteChange('signin')} className='f3 link dim underline pa3 pointer'>Sign Out</p>
      </nav>
    : <nav className='right'>
        <p onClick={() => onRouteChange('signin')} className='f3 link dim underline pa3 pointer'>Sign In</p>
        <p onClick={() => onRouteChange('register')} className='f3 link dim underline pa3 pointer'>Register</p>
      </nav>
    }
    </div>
  );
}

export default Navigation;