import React from 'react';
import { Link, IndexLink } from 'react-router';
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

export default (props) => {
  return (
    <Toolbar>
      <ToolbarGroup firstChild={true} style={ style.header.left } >
        <ToolbarTitle text="CVs" />
        <IndexLink to="/" onlyActiveOnIndex={true} style={ style.link } >
          <RaisedButton label="Home" />
        </IndexLink>
      </ToolbarGroup>
      <ToolbarGroup lastChild={true} style={ style.header.right }>
        <Link to="login" activeClassName="active" style={ style.link }>
          <RaisedButton label="Login" />
        </Link>
        <Link to="profile" activeClassName="active" style={ style.link }>
          <RaisedButton label="Profile" />
        </Link>
        <Link to="logout" activeClassName="active" style={ style.link }>
          <RaisedButton label="Logout" />
        </Link>
      </ToolbarGroup>
    </Toolbar>
  );
}