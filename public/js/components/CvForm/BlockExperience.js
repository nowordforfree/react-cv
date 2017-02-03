import React from 'react';
import { Field } from 'redux-form';

export default (props) => {
  const maxYear = new Date().getFullYear();
  return (
    <div className={props.class}>
      {props.data.map((obj, i) => (
        <div key={i}>
          <div className="row">
            <div className="col-sm-6">
              <Field
                component={props.fieldRenderFn}
                fullWidth={true}
                hintText="Since"
                max={maxYear}
                min="1950"
                name={`since`}
                type="number"
                value={obj.since}
              />
            </div>
            <div className="col-sm-6">
              <Field
                component={props.fieldRenderFn}
                fullWidth={true}
                hintText="Till"
                max={maxYear}
                min="1950"
                name={`till`}
                type="number"
                value={obj.till}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <Field
                component={props.fieldRenderFn}
                fullWidth={true}
                hintText="Company"
                name={`experienceCompany`}
                value={obj.company}
              />
            </div>
            <div className="col-sm-6">
              <Field
                component={props.fieldRenderFn}
                fullWidth={true}
                hintText="Position (role)"
                name={`experienceRole`}
                value={obj.role}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}