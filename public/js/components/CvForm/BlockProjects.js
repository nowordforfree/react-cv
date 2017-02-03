import React from 'react';
import { Field } from 'redux-form';

export default (props) => {
  return (
    <div className={props.class}>
      {props.data.map((obj, i) => (
        <div key={i}>
          <div className="row">
            <div className="col-sm-6">
              <Field
                component={props.fieldRenderFn}
                fullWidth={true}
                hintText="Project Title"
                name={`title`}
                value={obj.title}
              />
            </div>
            <div className="col-sm-6">
              <Field
                component={props.fieldRenderFn}
                fullWidth={true}
                hintText="Role in project (position)"
                name={`position`}
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
                name={`description`}
                rows={2}
                rowsMax={4}
                value={obj.description}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};