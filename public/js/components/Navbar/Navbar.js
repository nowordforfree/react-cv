import React from 'react';
import { Link } from 'react-router';

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
              <li>
                <Link to="/" onClick={this.collapseNavbar}>
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li>
                <Link to="#" onClick={this.collapseNavbar}>
                  Link
                </Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/login" onClick={this.collapseNavbar}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/profile" onClick={this.collapseNavbar}>
                  {this.props.username}
                </Link>
              </li>
              <li>
                <Link to="#" onClick={this.collapseNavbar}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}