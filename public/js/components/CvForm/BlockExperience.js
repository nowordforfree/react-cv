import React from 'react';
import { Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';

const maxYear = new Date().getFullYear();

const BlockExperience = props => (
  <div className={props.class}>
    {props.data.map((obj, i) => (
      <div key={i}>
        <div className="row">
          <div className="col-xs-3 col-sm-6">
            <Field
              component={props.fieldRenderFn}
              fullWidth
              hintText="Since"
              max={maxYear}
              min="1950"
              name={`cv.experiences[${i}].since`}
              type="number"
              value={obj.since}
            />
          </div>
          <div className="col-xs-3 col-sm-6">
            <Field
              component={props.fieldRenderFn}
              fullWidth
              hintText="Till"
              max={maxYear}
              min="1950"
              name={`cv.experiences[${i}].till`}
              type="number"
              value={obj.till}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6 col-sm-6">
            <Field
              component={props.fieldRenderFn}
              fullWidth
              hintText="Company"
              name={`cv.experiences[${i}].company`}
              value={obj.company}
            />
          </div>
          <div className="col-xs-6 col-sm-6">
            <Field
              component={props.fieldRenderFn}
              fullWidth
              hintText="Position (role)"
              name={`cv.experiences[${i}].role`}
              value={obj.role}
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

BlockExperience.propTypes = {
  class: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  fieldRenderFn: React.PropTypes.func.isRequired
};

export default BlockExperience;
