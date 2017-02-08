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

const renderTextField = ({ input, label, meta: { active, touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={(active || touched) && error}
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
        communication: '',
        education: '',
        experiences: [],
        firstname: '',
        lastname: '',
        projects: [],
        role: '',
        tools: []
      },
      snackbar: {
        message: '',
        open: false
      },
      toolsInput: ''
    };
    this.submitBtnText = 'Create';
    const firstState = this.initialState;
    if (props.location.state &&
        props.location.state.cv) {
      const { createdAt, updatedAt, id, ...data } = props.location.state.cv;
      this.cvId = id;
      firstState.cv = data;
      this.submitBtnText = 'Update';
    }
    this.state = firstState;
    this.props.initialize(this.state);
  }
  renderChip(data, i) {
    return (
      <Chip
        key={data}
        onRequestDelete={() => this.removeTool(data)}
        style={styles.chip}
      >
        {data}
      </Chip>
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
    const updatedCv = Object.assign({}, this.state.cv);
    let tools = updatedCv.tools.slice();
    tools.push(e.target.value);
    updatedCv.tools = tools;
    this.props.change('toolsInput', '');
    this.props.change('cv.tools', tools);
    this.setState({
      cv: updatedCv,
      toolsInput: this.initialState.toolsInput
    });
  }
  removeTool(key) {
    const updatedCv = Object.assign({}, this.state.cv);
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
  submit(values) {
    if (this.cvId) {
      this.props.updateCv(this.cvId, values.cv).then(() => {
        this.setState({
          snackbar: {
            open: true,
            message: 'Changes saved successfully'
          }
        });
      })
      .catch(err => {
        this.setState({
          snackbar: {
            open: true,
            message: 'Some error occured while trying to save changes'
          }
        });
      });
    } else {
      this.props.createCv(values.cv);
    }
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
                <Field
                  name="cv.tools"
                  value={this.state.cv.tools}
                  component={() => (
                    <div style={styles.wrapper} >
                      {this.state.cv.tools.map(this.renderChip, this)}
                    </div>
                  )}
                />
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
        <Snackbar
          open={this.state.snackbar.open}
          message={this.state.snackbar.message}
          autoHideDuration={2000}
        />
      </div>
    );
  }
}