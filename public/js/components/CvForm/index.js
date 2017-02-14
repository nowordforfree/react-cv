import React from 'react';
import { Field, change, stopSubmit } from 'redux-form';
import {
  Chip,
  IconButton,
  RaisedButton,
  Snackbar
 } from 'material-ui';
import BlockExperience from './BlockExperience';
import BlockProjects from './BlockProjects';
import AddIcon from 'material-ui/svg-icons/content/add';
import { renderTextField } from '../../helpers';

import './CvForm.less';

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
  get initialState() {
    return {
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
      submitBtnText: 'Create',
      toolsInput: ''
    };
  }
  constructor(props) {
    super(props);
    this.resetState();
  }
  resetState() {
    const firstState = this.initialState;
    if (this.props.location.state &&
        this.props.location.state.cv) {
      const { createdAt, updatedAt, id, ...data } = this.props.location.state.cv;
      if (this.props.location.state.snackbar) {
        Object.assign(firstState, props.location.state.snackbar);
      }
      this.cvId = id;
      firstState.cv = data;
      firstState.submitBtnText = 'Update';
    }
    this.state = firstState;
    this.props.initialize(this.state);
  }
  resetForm(resetFormFn) {
    resetFormFn();
    this.resetState();
  }
  renderChip(data, i) {
    return (
      <Chip
        key={data}
        className="chip"
        onRequestDelete={this.removeSub.bind(this, 'tools', i)}
        style={styles.chip} >
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
      snackbar: this.initialState.snackbar,
      toolsInput: this.initialState.toolsInput
    });
  }
  removeSub(key, index) {
    const updatedCv = Object.assign({}, this.state.cv);
    let subArray = updatedCv[key].slice();
    subArray.splice(index, 1);
    updatedCv[key] = subArray;
    this.setState({ cv: updatedCv });
    this.props.change(`cv.${key}`, subArray);
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
      this.props.updateCv(this.cvId, values.cv).then((cv) => {
        if (cv.data) {
          this.props.router.replace({
            pathname: `/cv/${cv.data.id}`,
            state: { cv: cv.data }
          });
          this.setState({
            snackbar: {
              open: true,
              message: 'Changes saved successfully'
            }
          });
        }
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
      this.props.createCv(values.cv).then((cv) => {
        if (cv.data) {
          this.cvId = cv.data.id;
          this.props.router.push({
            pathname: `/cv/${cv.data.id}`,
            state: { cv: cv.data }
          });
          this.setState({
            cv: cv.data,
            snackbar: {
              message: 'New CV created successfully',
              open: true
            },
            submitBtnText: 'Update'
          });
        }
        if (cv.error) {
          this.setState({
            snackbar: {
              message: cv.error,
              open: true
            }
          });
        }
      });
    }
  }
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting
    } = this.props;
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
                  className="hidden-print"
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
                  className="hidden-print"
                  iconStyle={styles.block.iconStyle}
                  style={styles.block.iconButton}
                  onClick={this.addExperience.bind(this)}
                >
                  <AddIcon />
                </IconButton>
              </label>
              <BlockExperience
                class="col-sm-9 block align-right-sm"
                fieldRenderFn={renderTextField}
                data={this.state.cv.experiences}
                deleteFn={this.removeSub.bind(this, 'experiences')}
              />
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label" style={styles.block.label}>
                Projects
                <IconButton
                  tooltip="Add Project"
                  className="hidden-print"
                  iconStyle={styles.block.iconStyle}
                  style={styles.block.iconButton}
                  onClick={this.addProject.bind(this)}
                >
                  <AddIcon />
                </IconButton>
              </label>
              <BlockProjects
                class="col-sm-9 block align-right-sm"
                fieldRenderFn={renderTextField}
                data={this.state.cv.projects}
                deleteFn={this.removeSub.bind(this, 'projects')}
              />
            </div>
            <div className="form-group">
              <RaisedButton
                className="hidden-print"
                disabled={pristine || submitting}
                label={this.state.submitBtnText}
                primary={true}
                type="submit"
              />
              <RaisedButton
                className="hidden-print"
                className={pristine ? 'hidden' : ''}
                label="Reset"
                onClick={this.resetForm.bind(this, reset)}
                style={{ marginLeft: 20 }}
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