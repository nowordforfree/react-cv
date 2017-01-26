import React from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  header: {
    left: {
      marginLeft: 0
    },
    right: {
      marginRight: '-12px'
    }
  },
  link: {
    margin: '0 12px'
  }
}

const Navbar = ({ signedIn, logout }) => (
  <Toolbar>
    <ToolbarGroup firstChild={true} style={ style.header.left } >
      <ToolbarTitle text="CVs" />
      <IndexLink to="/" onlyActiveOnIndex={true} style={ style.link } >
        <RaisedButton label="Home" />
      </IndexLink>
    </ToolbarGroup>
    { signedIn ?
      <ToolbarGroup lastChild={true} style={ style.header.right }>
        <Link to="profile" activeClassName="active" style={ style.link }>
          <RaisedButton label="Profile" />
        </Link>
        <RaisedButton label="Logout" onClick={logout} />
      </ToolbarGroup>
      :
      <ToolbarGroup>
        <Link to="login" activeClassName="active" style={ style.link }>
          <RaisedButton label="Login" />
        </Link>
      </ToolbarGroup>
    }
  </Toolbar>
);

const mapStateToProps = (state) => ({
  signedIn: state.auth.signedIn
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
