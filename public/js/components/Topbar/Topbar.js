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
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
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

const Topbar = ({ signedIn, logout }) => (
  <AppBar
    title="CVs"
    className="hidden-print"
    iconElementRight={
      signedIn ? <Logged logout={logout} /> : <Login />
    }
    showMenuIconButton={false}
  />
);

const mapStateToProps = (state) => ({
  signedIn: state.auth.signedIn
});

export default connect(
  mapStateToProps,
  { logout }
)(Topbar);
