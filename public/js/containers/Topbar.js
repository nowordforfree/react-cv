import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import SvgMenu from 'material-ui/svg-icons/navigation/menu';
import SvgSubject from 'material-ui/svg-icons/action/subject';
import SvgProfile from 'material-ui/svg-icons/action/account-circle';
import SvgLogout from 'material-ui/svg-icons/action/exit-to-app';
import SvgBack from 'material-ui/svg-icons/navigation/chevron-left';
import SvgNext from 'material-ui/svg-icons/navigation/chevron-right';
import { logout } from '../actions';

const Login = () => (
  <FlatButton
    containerElement={
      <Link to="login" activeClassName="active" />
    }
    style={{ color: '#fff' }}
    label="Login"
  />
);

const Logged = props => (
  <IconMenu
    iconButtonElement={
      <IconButton iconStyle={{ color: '#fff' }}>
        <SvgMenu />
      </IconButton>
    }
    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
    touchTapCloseDelay={5}
  >
    <MenuItem
      containerElement={
        <Link to="/" activeClassName="hidden" onlyActiveOnIndex />
      }
      primaryText="Main Page"
      rightIcon={
        <SvgSubject />
      }
    />
    <MenuItem
      containerElement={
        <Link to="profile" activeClassName="hidden" />
      }
      primaryText="Profile"
      rightIcon={
        <SvgProfile />
        }
    />
    <MenuItem
      primaryText="Logout"
      onTouchTap={props.logout}
      rightIcon={
        <SvgLogout />
      }
    />
  </IconMenu>
);

Logged.propTypes = {
  logout: React.PropTypes.func.isRequired
};

const Navigation = props => (
  <div>
    <FlatButton
      label="Back"
      icon={<SvgBack />}
      style={{ color: '#fff' }}
      onTouchTap={props.router.goBack}
    />
    <FlatButton
      label="Forward"
      labelPosition="before"
      icon={<SvgNext />}
      style={{ color: '#fff' }}
      onTouchTap={props.router.goForward}
    />
  </div>
);

Navigation.propTypes = {
  router: React.PropTypes.object.isRequired
};

const Topbar = props => (
  <AppBar
    title="CVs"
    className="hidden-print"
    iconElementLeft={
      props.signedIn ? <Logged logout={props.logout} /> : null
    }
    iconElementRight={
      props.signedIn ? <Navigation router={props.router} /> : <Login />
    }
    showMenuIconButton={props.signedIn}
    style={{
      position: 'fixed',
      left: 0,
      top: 0
    }}
  />
);

Topbar.defaultProps = {
  signedIn: false
};

Topbar.propTypes = {
  signedIn: React.PropTypes.bool,
  logout: React.PropTypes.func.isRequired,
  router: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  signedIn: state.auth.signedIn
});

export default connect(
  mapStateToProps,
  { logout }
)(Topbar);
