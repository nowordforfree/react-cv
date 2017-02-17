import React from 'react';
import { Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';

const BlockProjects = props => (
  <div className={props.class}>
    {props.data.map((obj, i) => (
      <div key={i}>
        <div className="row">
          <label
            className="control-label col-xs-3 col-sm-6 visible-print-inline"
            htmlFor={`cv.projects[${i}].title`}
          >
            Title:
          </label>
          <div className="col-xs-9 col-sm-6">
            <Field
              component={props.fieldRenderFn}
              fullWidth
              hintText="Project Title"
              name={`cv.projects[${i}].title`}
              value={obj.title}
            />
          </div>
          <label
            className="control-label col-xs-3 col-sm-6 visible-print-inline"
            htmlFor={`cv.projects[${i}].role`}
          >
            Role in project:
          </label>
          <div className="col-xs-9 col-sm-6">
            <Field
              component={props.fieldRenderFn}
              fullWidth
              hintText="Role in project (position)"
              name={`cv.projects[${i}].role`}
              value={obj.role}
            />
          </div>
        </div>
        <div className="row">
          <label
            className="control-label col-xs-3 col-sm-6 visible-print-inline"
            htmlFor={`cv.projects[${i}].description`}
          >
            Description:
          </label>
          <div className="col-xs-9 col-sm-12">
            <Field
              component={props.fieldRenderFn}
              fullWidth
              hintText="Description"
              multiLine
              name={`cv.projects[${i}].description`}
              rows={2}
              rowsMax={4}
              value={obj.description}
            />
          </div>
        </div>
        <RaisedButton
          className="hidden-print"
          label="Remove"
          style={{
            marginBottom: 15,
            marginTop: 15
          }}
          onTouchTap={() => props.deleteFn(i)}
        />
      </div>
    ))}
  </div>
);

BlockProjects.propTypes = {
  class: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  fieldRenderFn: React.PropTypes.func.isRequired
};

export default BlockProjects;
