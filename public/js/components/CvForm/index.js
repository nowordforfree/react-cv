import React from 'react';
import { Field } from 'redux-form';
import {
  Chip,
  IconButton,
  RaisedButton,
  Snackbar
 } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';
import BlockExperience from './BlockExperience';
import BlockProjects from './BlockProjects';
import renderTextField from '../../helpers';

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

class CvForm extends React.Component {
  static get initialState() {
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
    this.addExperience = this.addExperience.bind(this);
    this.addProject = this.addProject.bind(this);
    this.addTool = this.addTool.bind(this);
    this.changedTool = this.changedTool.bind(this);
    this.deleteExperienceFn = this.removeSub.bind(this, 'experiences');
    this.deleteProjectFn = this.removeSub.bind(this, 'projects');
    this.resetState = this.resetState.bind(this);
    this.submit = this.submit.bind(this);
    this.validateTool = this.validateTool.bind(this);
    this.resetState();
  }
  resetState() {
    const firstState = CvForm.initialState;
    if (this.props.location.state &&
        this.props.location.state.cv) {
      const {
        // turning off eslint to extract unnecessary props
        /* eslint-disable no-unused-vars */
        createdAt,
        updatedAt,
        /* eslint-enable no-unused-vars */
        id,
        ...data
      } = this.props.location.state.cv;
      if (this.props.location.state.snackbar) {
        Object.assign(firstState, this.props.location.state.snackbar);
      }
      this.cvId = id;
      firstState.cv = data;
      firstState.submitBtnText = 'Update';
    }
    this.state = firstState;
    this.props.initialize(this.state);
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
    const tools = updatedCv.tools.slice();
    tools.push(e.target.value);
    updatedCv.tools = tools;
    this.props.change('toolsInput', '');
    this.props.change('cv.tools', tools);
    this.setState({
      cv: updatedCv,
      snackbar: CvForm.initialState.snackbar,
      toolsInput: CvForm.initialState.toolsInput
    });
  }
  removeSub(key, index) {
    const updatedCv = Object.assign({}, this.state.cv);
    const subArray = updatedCv[key].slice();
    subArray.splice(index, 1);
    updatedCv[key] = subArray;
    this.setState({ cv: updatedCv });
    this.props.array.remove(`cv.${key}`, index);
  }
  addExperience() {
    const newExperience = {
      company: '',
      role: '',
      since: '',
      till: ''
    };
    const updatedCv = Object.assign({}, this.state.cv);
    updatedCv.experiences = updatedCv.experiences.concat([newExperience]);
    this.setState({ cv: updatedCv });
  }
  addProject() {
    const newProject = {
      description: '',
      role: '',
      title: ''
    };
    const updatedCv = Object.assign({}, this.state.cv);
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
      .catch(() => {
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
  renderChip(data, i) {
    const removeChipFn = this.removeSub.bind(this, 'tools', i);
    return (
      <Chip
        key={data}
        className="chip"
        onRequestDelete={removeChipFn}
        style={styles.chip}
      >
        {data}
      </Chip>
    );
  }
  render() {
    const {
      handleSubmit,
      pristine,
      submitting
    } = this.props;
    return (
      <div className="container">
        <div className="visible-print-block">
          <div className="cv-head">
            <img
              alt=""
              className="chevron top"
              src="/img/chevron_top.svg"
            />
            <h1>{this.state.cv.firstname}</h1>
            <h1>{this.state.cv.lastname}</h1>
            <img
              alt=""
              className="chevron bottom"
              src="/img/chevron_bottom.svg"
            />
          </div>
        </div>
        <form className="form-horizontal" onSubmit={handleSubmit(this.submit)}>
          <fieldset>
            <div className="form-group hidden-print">
              <label
                className="col-sm-3 control-label"
                htmlFor="firstname"
              >
                First Name
              </label>
              <div className="col-sm-9">
                <Field
                  component={renderTextField}
                  fullWidth
                  id="firstname"
                  name="cv.firstname"
                  value={this.state.cv.firstname}
                />
              </div>
            </div>
            <div className="form-group hidden-print">
              <label
                className="col-sm-3 control-label"
                htmlFor="lastname"
              >
                Last Name
              </label>
              <div className="col-sm-9">
                <Field
                  component={renderTextField}
                  fullWidth
                  id="lastname"
                  name="cv.lastname"
                  value={this.state.cv.lastname}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                className="col-sm-3 control-label"
                htmlFor="role"
              >
                Role
              </label>
              <div className="col-sm-9">
                <Field
                  component={renderTextField}
                  fullWidth
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
                  fullWidth
                  hintText="Languages and proficiency"
                  id="communication"
                  name="cv.communication"
                  value={this.state.cv.communication}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                className="col-sm-3 control-label"
                htmlFor="education"
              >
                Education
              </label>
              <div className="col-sm-9">
                <Field
                  component={renderTextField}
                  fullWidth
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
                  fullWidth
                  hintText='Press "Enter" to add new record'
                  id="tools"
                  name="toolsInput"
                  value={this.state.toolsInput}
                  onKeyDown={this.addTool}
                  onChange={this.changedTool}
                  validate={this.validateTool}
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
              <label
                className="col-sm-3 control-label"
                htmlFor="experiences"
                style={styles.block.label}
              >
                Experience
                <IconButton
                  tooltip="Add Experience"
                  className="hidden-print"
                  iconStyle={styles.block.iconStyle}
                  style={styles.block.iconButton}
                  onClick={this.addExperience}
                >
                  <AddIcon />
                </IconButton>
              </label>
              <BlockExperience
                class="col-sm-9 block align-right-sm"
                fieldRenderFn={renderTextField}
                data={this.state.cv.experiences}
                deleteFn={this.deleteExperienceFn}
              />
            </div>
            <div className="form-group">
              <label
                className="col-sm-3 control-label"
                htmlFor="projects"
                style={styles.block.label}
              >
                Projects
                <IconButton
                  tooltip="Add Project"
                  className="hidden-print"
                  iconStyle={styles.block.iconStyle}
                  style={styles.block.iconButton}
                  onClick={this.addProject}
                >
                  <AddIcon />
                </IconButton>
              </label>
              <BlockProjects
                class="col-sm-9 block align-right-sm"
                fieldRenderFn={renderTextField}
                data={this.state.cv.projects}
                deleteFn={this.deleteProjectFn}
              />
            </div>
            <div className="form-group">
              <RaisedButton
                className="hidden-print"
                disabled={pristine || submitting}
                label={this.state.submitBtnText}
                primary
                type="submit"
              />
              <RaisedButton
                className={`hidden-print ${pristine ? 'hidden' : ''}`}
                label="Reset"
                onClick={this.resetState}
                style={{ marginLeft: 20 }}
              />
            </div>
          </fieldset>
        </form>
        <footer className="visible-print-block">
          <a
            href="https://nixsolutions.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img alt="" src="/img/logo.png" />
          </a>
        </footer>
        <Snackbar
          open={this.state.snackbar.open}
          message={this.state.snackbar.message}
          autoHideDuration={2000}
        />
      </div>
    );
  }
}

CvForm.propTypes = {
  array: React.PropTypes.object.isRequired,
  change: React.PropTypes.func.isRequired,
  createCv: React.PropTypes.func.isRequired,
  form: React.PropTypes.string.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  initialize: React.PropTypes.func.isRequired,
  location: React.PropTypes.object.isRequired,
  notSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  router: React.PropTypes.object.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  updateCv: React.PropTypes.func.isRequired
};

export default CvForm;
