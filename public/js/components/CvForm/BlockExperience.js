import React from 'react';
import { Field } from 'redux-form';

export default (props) => (
  <div className={props.class}>
    <div className="row">
      <div className="col-sm-6">
        <Field
          component={props.fieldRenderFn}
          fullWidth={true}
          hintText="Since"
          max={new Date().getFullYear()}
          min="1950"
          name="since"
          type="number"
        />
      </div>
      <div className="col-sm-6">
        <Field
          component={props.fieldRenderFn}
          fullWidth={true}
          hintText="Till"
          max={new Date().getFullYear()}
          min="1950"
          name="till"
          type="number"
        />
      </div>
    </div>
    <div className="row">
      <div className="col-sm-6">
        <Field
          component={props.fieldRenderFn}
          fullWidth={true}
          hintText="Company"
          name="experienceCompany"
        />
      </div>
      <div className="col-sm-6">
        <Field
          component={props.fieldRenderFn}
          fullWidth={true}
          hintText="Position (role)"
          name="experienceRole"
        />
      </div>
    </div>
  </div>
);