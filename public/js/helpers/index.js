import React from 'react';
import TextField from 'material-ui/TextField';

export const renderTextField = ({ input, label, meta: { active, touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={(touched || active) && error}
    {...input}
    {...custom}
  />
);
