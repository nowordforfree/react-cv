import React from 'react';

export default (props) => {
  return (
    <form className="form-horizontal col-md-offset-2 col-md-8">
      <div className="form-group">
        <label htmlFor="email" className="col-xs-3 control-label">
          Email
        </label>
        <div className="col-xs-9">
          <input type="email" id="email"
                 name="email" className="form-control"
                 required/>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="password" className="col-xs-3 control-label">
          Password
        </label>
        <div className="col-xs-9">
          <input type="password" id="password"
                 name="password" className="form-control"
                 required/>
        </div>
      </div>
      <div className="form-group">
        <div className="col-xs-offset-3 col-xs-9">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
  );
}