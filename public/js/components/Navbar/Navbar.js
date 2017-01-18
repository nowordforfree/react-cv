import React from 'react';
import NavLink from './NavLink';

export default class Navbar extends React.Component {
  collapseNavbar() {
    let currentWidth = parseInt(getComputedStyle(document.body).width);
    if (currentWidth < 768) {
      $('.navbar .collapse').collapse('hide');
    }
  }
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button"
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#bs-navbar"
                    aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Brand</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-navbar">
            <ul className="nav navbar-nav">
              <NavLink to="/" index={true} onlyActiveOnIndex={true} onClick={this.collapseNavbar}>
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <NavLink to="login" onClick={this.collapseNavbar}>
                Login
              </NavLink>
              <NavLink to="profile" onClick={this.collapseNavbar}>
                {this.props.username}
              </NavLink>
              <NavLink to="logout" onClick={this.collapseNavbar}>
                Logout
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}