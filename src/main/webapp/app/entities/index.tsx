import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Region from './region';
import Country from './country';
import Location from './location';
import Warehouse from './warehouse';
import Person from './person';
import PurchaseOrder from './purchase-order';
import Transaction from './transaction';
import Bag from './bag';
import Grain from './grain';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}region`} component={Region} />
      <ErrorBoundaryRoute path={`${match.url}country`} component={Country} />
      <ErrorBoundaryRoute path={`${match.url}location`} component={Location} />
      <ErrorBoundaryRoute path={`${match.url}warehouse`} component={Warehouse} />
      <ErrorBoundaryRoute path={`${match.url}person`} component={Person} />
      <ErrorBoundaryRoute path={`${match.url}purchase-order`} component={PurchaseOrder} />
      <ErrorBoundaryRoute path={`${match.url}transaction`} component={Transaction} />
      <ErrorBoundaryRoute path={`${match.url}bag`} component={Bag} />
      <ErrorBoundaryRoute path={`${match.url}grain`} component={Grain} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
