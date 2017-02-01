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

let initialState = {
  cv: {
    firstname: '',
    lastname: '',
    role: '',
    communication: '',
    education: '',
    tools: []
  },
  toolsInput: ''
};

export default class CvForm extends React.Component {
  constructor(props) {
    super(props);
    if (props.cv) {
      initialState = Object.assign(initialState, props.cv);
    }
    this.state = initialState;
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
    let updatedCv = Object.assign({}, this.state.cv);
    let tools = this.state.cv.tools.slice();
    tools.push(e.target.value);
    updatedCv.tools = tools;
    this.setState({
      cv: updatedCv,
      toolsInput: initialState.toolsInput
    });
  }
  removeTool(key) {
    let tools = this.state.cv.tools.slice();
    tools.splice(tools.indexOf(key), 1);
    this.setState({ cv: { tools: tools } });
  }
  submit(values) {
    // not implemented yet
    console.log(this.state.cv);
    return false;
  }
  onValueChange(e, newValue) {
    this.setState({toolsInput: newValue})
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
                  fullWidth={true}
                  id="firstname"
                  name="firstname"
                  value={this.state.cv.firstname}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label" htmlFor="lastname">Last Name</label>
              <div className="col-sm-9">
                <Field
                  component={renderTextField}
                  fullWidth={true}
                  id="lastname"
                  name="lastname"
                  value={this.state.cv.lastname}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label" htmlFor="role">Role</label>
              <div className="col-sm-9">
                <Field
                  component={renderTextField}
                  fullWidth={true}
                  hintText="Current position"
                  id="role"
                  name="role"
                  value={this.state.cv.role}
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
                  fullWidth={true}
                  hintText="Languages and proficiency"
                  id="communication"
                  name="communication"
                  value={this.state.cv.communication}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label" htmlFor="education">Education</label>
              <div className="col-sm-9">
                <Field
                  component={renderTextField}
                  fullWidth={true}
                  id="education"
                  name="education"
                  value={this.state.cv.education}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label" htmlFor="tools">
                Tools / Frameworks
              </label>
              <div className="col-sm-9">
                <Field
                  component={() => {
                    // HACK. If passing onKeyDown
                    // to Field - input is not being cleared
                    return (
                      <TextField
                        fullWidth={true}
                        hintText='Press "Enter" to add new record'
                        id="tools"
                        onKeyDown={this.addTool.bind(this)}
                      />
                    )
                  }}
                  value={this.state.toolsInput}
                  name="tools"
                />
                <div style={this.styles.wrapper} >
                  {this.state.cv.tools.map(this.renderChip, this)}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label" htmlFor="experience">Experience</label>
              <div className="col-sm-9">
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      fullWidth={true}
                      hintText="Since"
                      min="1950"
                      max={new Date().getFullYear()}
                      type="number"
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      fullWidth={true}
                      hintText="Till"
                      min="1950"
                      max={new Date().getFullYear()}
                      type="number"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      fullWidth={true}
                      hintText="Company"
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      fullWidth={true}
                      hintText="Position (role)"
                    />
                  </div>
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