import React from 'react';
import CvListItem from '../CvListItem';

export default ({ cvs, onCvClick }) => (
  <ul>
    {cvs.map(cv => {
      <CvListItem
        key={cv.id}
        {...cv}
        onClick={() => onCvClick(cv.id) }
      />
    })}
  </ul>
);
