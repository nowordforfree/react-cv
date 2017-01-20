import React from 'react';
import Navbar from '../Navbar';
import Paper from 'material-ui/Paper';

export default (props) => {
  const style = {
    minHeight: 200,
    margin: 20,
    textAlign: 'center'
  };

  return (
    <div>
      <Navbar username='me'/>
      <Paper style={style} zDepth={1}>
        {props.children}
      </Paper>
    </div>
  );
};