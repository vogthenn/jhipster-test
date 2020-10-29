import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Grain from './grain';
import GrainDetail from './grain-detail';
import GrainUpdate from './grain-update';
import GrainDeleteDialog from './grain-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={GrainUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={GrainUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={GrainDetail} />
      <ErrorBoundaryRoute path={match.url} component={Grain} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={GrainDeleteDialog} />
  </>
);

export default Routes;
