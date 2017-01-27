import React from 'react';
import { Link, IndexLink } from 'react-router'

class NavItem extends React.Component {
  render () {
    const { router } = this.context;
    const { index, onlyActiveOnIndex, to, children, ...props } = this.props;

    const isActive = router.isActive(to, onlyActiveOnIndex);
    const LinkComponent = index ? IndexLink : Link;
    const args = {to, ...props};

    return (
      <li className={isActive ? 'active' : ''}>
        <LinkComponent {...args}>{children}</LinkComponent>
      </li>
    );
  }
}

NavItem.contextTypes = {
  router: React.PropTypes.object
};

export default NavItem;