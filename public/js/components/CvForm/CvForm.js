import React from 'react';
import { Field, change, stopSubmit } from 'redux-form';
import {
  Chip,
  IconButton,
  RaisedButton,
  Snackbar,
  TextField
 } from 'material-ui';
import BlockExperience from './BlockExperience';
import BlockProjects from './BlockProjects';
import AddIcon from 'material-ui/svg-icons/content/add';

import './CvForm.less';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const styles = {
  block: {
    label: {
      paddingTop: 2
    },
    iconButton: {
      height: 44,
      width: 44,
      padding: 8,
      verticalAlign: 'middle'
    },
    iconStyle: {
      height: 18,
      width: 18
    }
  },
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  }
};

export default class CvForm extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      cv: {
        firstname: '',
        lastname: '',
        role: '',
        communication: '',
        education: '',
        tools: [],
        experiences: [],
        projects: []
      },
      toolsInput: ''
    };
    this.submitBtnText = 'Create';
    const firstState = this.initialState;
    if (props.location.state &&
        props.location.state.cv) {
      firstState.cv = props.location.state.cv;
      this.submitBtnText = 'Update';
    }
    this.state = firstState;
    this.props.initialize(this.state);
  }
  renderChip(data, i) {
    return (
      <Field
        name={`cv.tools[${i}]`}
        key={data}
        component={() => (
          <Chip
            onRequestDelete={() => this.removeTool(data)}
            style={styles.chip}
          >
            {data}
          </Chip>
        )}
      />
    );
  }
  changedTool(e, value) {
    const err = this.validateTool(value);
    if (err) {
      this.props.notSubmit(this.props.form, { toolsInput: err });
    }
    return err;
  }
  validateTool(value) {
    return this.state.cv.tools.indexOf(value) > -1 ?
            'You already added this' :
            undefined;
  }
  addTool(e) {
    if (e.keyCode !== 13 || !e.target.value) {
      return;
    }
    e.preventDefault();
    if (this.changedTool(null, e.target.value)) {
      return;
    }
    let updatedCv = Object.assign({}, this.state.cv);
    let tools = updatedCv.tools.slice();
    tools.push(e.target.value);
    updatedCv.tools = tools;
    this.props.change(this.props.form, 'toolsInput', '');
    this.setState({
      cv: updatedCv,
      toolsInput: this.initialState.toolsInput
    });
  }
  removeTool(key) {
    let updatedCv = Object.assign({}, this.state.cv);
    let tools = updatedCv.tools.slice();
    tools.splice(tools.indexOf(key), 1);
    updatedCv.tools = tools;
    this.setState({ cv: updatedCv });
  }
  addExperience() {
    const newExperience = {
      company: '',
      role: '',
      since: '',
      till: ''
    };
    let updatedCv = Object.assign({}, this.state.cv);
    updatedCv.experiences = updatedCv.experiences.concat([newExperience]);
    this.setState({ cv: updatedCv });
  }
  accessKeyByString(o, s, v) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    const a = s.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
      const k = a[i];
      if (k in o) {
        if (i === n - 1 &&
            v !== null &&
            v !== undefined) {
          o[k] = v;
        }
        o = o[k];
      } else {
        return;
      }
    }
    return o;
  }
  addProject() {
    const newProject = {
      description: '',
      role: '',
      title: ''
    };
    let updatedCv = Object.assign({}, this.state.cv);
    updatedCv.projects = updatedCv.projects.concat([newProject]);
    this.setState({ cv: updatedCv });
  }
  handleChange(e, newValue) {
    // const target = e.target;
    // let updatedCv = Object.assign({}, this.state.cv);
    // this.accessKeyByString(updatedCv, target.name, newValue);
    // this.setState({ cv: updatedCv });
    // console.log(target.name)
  }
  submit(values) {
    // not implemented yet
    console.log(this.state.cv);
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
                  fullWidth={true}
                  id="firstname"
                  name="cv.firstname"
                  value={this.state.cv.firstname}
                  onChange={this.handleChange.bind(this)}
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
                  name="cv.lastname"
                  value={this.state.cv.lastname}
                  onChange={this.handleChange.bind(this)}
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
                  name="cv.role"
                  value={this.state.cv.role}
                  onChange={this.handleChange.bind(this)}
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
                  name="cv.communication"
                  value={this.state.cv.communication}
                  onChange={this.handleChange.bind(this)}
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
                  name="cv.education"
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
                  component={renderTextField}
                  fullWidth={true}
                  hintText='Press "Enter" to add new record'
                  id="tools"
                  name="toolsInput"
                  value={this.state.toolsInput}
                  onKeyDown={this.addTool.bind(this)}
                  onChange={this.changedTool.bind(this)}
                  validate={this.validateTool.bind(this)}
                />
                <div style={styles.wrapper} >
                  {this.state.cv.tools.map(this.renderChip, this)}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label" style={styles.block.label}>
                Experience
                <IconButton
                  tooltip="Add Experience"
                  iconStyle={styles.block.iconStyle}
                  style={styles.block.iconButton}
                  onClick={this.addExperience.bind(this)}
                >
                  <AddIcon />
                </IconButton>
              </label>
              <BlockExperience
                class="col-sm-9"
                fieldRenderFn={renderTextField}
                data={this.state.cv.experiences}
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label" style={styles.block.label}>
                Projects
                <IconButton
                  tooltip="Add Project"
                  iconStyle={styles.block.iconStyle}
                  style={styles.block.iconButton}
                  onClick={this.addProject.bind(this)}
                >
                  <AddIcon />
                </IconButton>
              </label>
              <BlockProjects
                class="col-sm-9"
                fieldRenderFn={renderTextField}
                data={this.state.cv.projects}
              />
            </div>
            <div className="form-group">
              <RaisedButton
                disabled={pristine || submitting}
                label={this.submitBtnText}
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