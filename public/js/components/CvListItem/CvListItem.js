import React from 'react';

export default ({onClick, data}) => (
  <li
    onClick={onClick}
    style={{textDecoration: 'none'}}
  >
    {Object.keys(data).map((key) => {
      return key + ': ' + data[key];
    })}
  </li>
);