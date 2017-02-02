import React from 'react';
import { Field } from 'redux-form';

export default (props) => (
  <div className={props.class}>
    <div className="row">
      <div className="col-sm-6">
        <Field
          component={props.fieldRenderFn}
          fullWidth={true}
          hintText="Project Title"
          name="title"
        />
      </div>
      <div className="col-sm-6">
        <Field
          component={props.fieldRenderFn}
          fullWidth={true}
          hintText="Role in project (position)"
          name="position"
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
          name="description"
          rows={2}
          rowsMax={4}
        />
      </div>
    </div>
  </div>
);