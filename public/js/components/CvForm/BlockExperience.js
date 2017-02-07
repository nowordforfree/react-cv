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
                name={`cv.experiences[${i}].since`}
                type="number"
                value={obj.since}
                onChange={props.onChange}
              />
            </div>
            <div className="col-sm-6">
              <Field
                component={props.fieldRenderFn}
                fullWidth={true}
                hintText="Till"
                max={maxYear}
                min="1950"
                name={`cv.experiences[${i}].till`}
                type="number"
                value={obj.till}
                onChange={props.onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <Field
                component={props.fieldRenderFn}
                fullWidth={true}
                hintText="Company"
                name={`cv.experiences[${i}].company`}
                value={obj.company}
                onChange={props.onChange}
              />
            </div>
            <div className="col-sm-6">
              <Field
                component={props.fieldRenderFn}
                fullWidth={true}
                hintText="Position (role)"
                name={`cv.experiences[${i}].role`}
                value={obj.role}
                onChange={props.onChange}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}