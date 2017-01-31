import React from 'react';
import { Field } from 'redux-form';
import {
  Chip,
  RaisedButton,
  Snackbar,
  TextField
 } from 'material-ui';

import './CvForm.less';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

export default class CvForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cv: {
        tools: [
          'AngularJS',
          'ReactJS',
          'Webpack'
        ]
      }
    };
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
  }
  renderChip(data) {
    return (
      <Chip
        key={data}
        onRequestDelete={() => this.removeTool(data)}
        style={this.styles.chip}
      >
        {data}
      </Chip>
    );
  }
  addTool(e) {
    if (e.keyCode !== 13 || !e.target.value) {
      return;
    }
    e.preventDefault();
    let cv = this.state.cv;
    cv.tools.push(e.target.value);
    this.setState({ cv: cv });
    e.target.value = '';
  }
  removeTool(key) {
    let cv = this.state.cv;
    cv.tools.splice(cv.tools.indexOf(key), 1);
    this.setState({ cv: cv });
  }
  submit(values) {
    // not implemented yet
    return false;
  }
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="container">
        <form className="form-horizontal" onSubmit={handleSubmit(this.submit.bind(this))}>
          <fieldset>
            <div className="form-group">
              <label className="col-sm-3 control-label" htmlFor="firstname">First Name</label>
              <div className="col-sm-9">
                <Field
                  component={renderTextField}
                  name="firstname"
                  id="firstname"
                  fullWidth={true}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label" htmlFor="lastname">Last Name</label>
              <div className="col-sm-9">
                <Field
                  component={renderTextField}
                  name="lastname"
                  id="lastname"
                  fullWidth={true}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label" htmlFor="role">Role</label>
              <div className="col-sm-9">
                <Field
                  component={renderTextField}
                  name="role"
                  id="role"
                  fullWidth={true}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label" htmlFor="communication">
                Communication Skills
              </label>
              <div className="col-sm-9">
                <Field
                  component={renderTextField}
                  name="communication"
                  id="communication"
                  fullWidth={true}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label" htmlFor="education">Education</label>
              <div className="col-sm-9">
                <Field
                  component={renderTextField}
                  name="education"
                  id="education"
                  fullWidth={true}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label" htmlFor="tools">
                Tools / Frameworks
              </label>
              <div className="col-sm-9">
                <Field
                  component={renderTextField}
                  hintText='Press "Enter" to add new record'
                  name="tools"
                  id="tools"
                  fullWidth={true}
                  onKeyDown={this.addTool.bind(this)}
                />
                <div style={this.styles.wrapper} >
                  {this.state.cv.tools.map(this.renderChip, this)}
                </div>
              </div>
            </div>
            <div className="form-group">
              <RaisedButton
                disabled={pristine || submitting}
                label="Create"
                primary={true}
                type="submit"
              />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}