import React from 'react';
import { Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';

export default (props) => (
  <div className={props.class}>
    {props.data.map((obj, i) => (
      <div key={i}>
        <div className="row">
          <div className="col-sm-6">
            <Field
              component={props.fieldRenderFn}
              fullWidth={true}
              hintText="Project Title"
              name={`cv.projects[${i}].title`}
              value={obj.title}
            />
          </div>
          <div className="col-sm-6">
            <Field
              component={props.fieldRenderFn}
              fullWidth={true}
              hintText="Role in project (position)"
              name={`cv.projects[${i}].role`}
              value={obj.role}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <Field
              component={props.fieldRenderFn}
              fullWidth={true}
              hintText="Description"
              multiLine={true}
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
