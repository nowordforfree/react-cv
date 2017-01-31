import React from 'react';
import { Link } from 'react-router';
import VisibleCvList from '../../containers/VisibleCvList';
import RaisedButton from 'material-ui/RaisedButton';

export default (props) => {
  return (
    <div className="container text-center">
      <RaisedButton
        label="Add New CV"
        containerElement={
          <Link to="cv" />
        }
      />
      <VisibleCvList />
    </div>
  );
};