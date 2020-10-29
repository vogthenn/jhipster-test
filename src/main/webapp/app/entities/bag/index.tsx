import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Bag from './bag';
import BagDetail from './bag-detail';
import BagUpdate from './bag-update';
import BagDeleteDialog from './bag-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BagUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BagUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BagDetail} />
      <ErrorBoundaryRoute path={match.url} component={Bag} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BagDeleteDialog} />
  </>
);

export default Routes;
