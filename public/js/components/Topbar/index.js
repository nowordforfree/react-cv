import React from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions';
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

const Login = () => (
  <FlatButton
    containerElement={
      <Link to="login" activeClassName="active" />
    }
    style={{color: '#fff'}}
    label="Login"
  />
);

const Logged = (props) => {
  return (
    <IconMenu
      iconButtonElement={
        <IconButton iconStyle={{color: '#fff'}}>
          <SvgMenu />
        </IconButton>
      }
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      touchTapCloseDelay={5}
    >
      <MenuItem
        containerElement={
          <Link to="/" activeClassName="hidden" onlyActiveOnIndex={true} />
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
        } />
    </IconMenu>
  );
}

const Navigation = ({ router }) => (
  <div>
    <FlatButton
      label="Back"
      icon={<SvgBack />}
      style={{ color: '#fff' }}
      onTouchTap={ router.goBack } />
    <FlatButton
      label="Forward"
      labelPosition="before"
      icon={<SvgNext />}
      style={{ color: '#fff' }}
      onTouchTap={ router.goForward } />
  </div>
)

const Topbar = ({ signedIn, logout, router }) => (
  <AppBar
    title="CVs"
    className="hidden-print"
    iconElementLeft={
      signedIn ? <Logged logout={logout} /> : null
    }
    iconElementRight={
      signedIn ? <Navigation router={router} /> : <Login />
    }
    showMenuIconButton={signedIn}
    style={{
      position: 'fixed',
      left: 0,
      top: 0
    }}
  />
);

const mapStateToProps = (state) => ({
  signedIn: state.auth.signedIn
});

export default connect(
  mapStateToProps,
  { logout }
)(Topbar);
