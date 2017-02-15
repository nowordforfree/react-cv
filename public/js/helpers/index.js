import React from 'react';
import TextField from 'material-ui/TextField';

const renderTextField =
  ({ input, label, meta: { active, touched, error }, ...custom }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={(touched || active) && error}
      {...input}
      {...custom}
    />
);

renderTextField.defaultProps = {
  label: ''
};

renderTextField.propTypes = {
  input: React.PropTypes.object.isRequired,
  label: React.PropTypes.string,
  meta: React.PropTypes.object.isRequired
};

export default renderTextField;
