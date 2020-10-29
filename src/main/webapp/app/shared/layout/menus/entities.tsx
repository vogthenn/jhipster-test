import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/region">
      <Translate contentKey="global.menu.entities.region" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/country">
      <Translate contentKey="global.menu.entities.country" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/location">
      <Translate contentKey="global.menu.entities.location" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/warehouse">
      <Translate contentKey="global.menu.entities.warehouse" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/person">
      <Translate contentKey="global.menu.entities.person" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/purchase-order">
      <Translate contentKey="global.menu.entities.purchaseOrder" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/transaction">
      <Translate contentKey="global.menu.entities.transaction" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/bag">
      <Translate contentKey="global.menu.entities.bag" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/grain">
      <Translate contentKey="global.menu.entities.grain" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
