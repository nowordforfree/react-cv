import React from 'react';
import Navbar from '../Navbar';

export default (props) => {
  return (
    <div>
      <Navbar username='me'/>
      <div className="container">
        {props.children}
      </div>
    </div>
  );
};