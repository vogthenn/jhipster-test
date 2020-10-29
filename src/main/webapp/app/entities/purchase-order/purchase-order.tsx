import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './purchase-order.reducer';
import { IPurchaseOrder } from 'app/shared/model/purchase-order.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPurchaseOrderProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PurchaseOrder = (props: IPurchaseOrderProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { purchaseOrderList, match, loading } = props;
  return (
    <div>
      <h2 id="purchase-order-heading">
        <Translate contentKey="jhipstertestApp.purchaseOrder.home.title">Purchase Orders</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="jhipstertestApp.purchaseOrder.home.createLabel">Create new Purchase Order</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {purchaseOrderList && purchaseOrderList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipstertestApp.purchaseOrder.desiredQuantity">Desired Quantity</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipstertestApp.purchaseOrder.desiredQuality">Desired Quality</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipstertestApp.purchaseOrder.location">Location</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {purchaseOrderList.map((purchaseOrder, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${purchaseOrder.id}`} color="link" size="sm">
                      {purchaseOrder.id}
                    </Button>
                  </td>
                  <td>{purchaseOrder.desiredQuantity}</td>
                  <td>{purchaseOrder.desiredQuality}</td>
                  <td>
                    {purchaseOrder.location ? <Link to={`location/${purchaseOrder.location.id}`}>{purchaseOrder.location.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${purchaseOrder.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${purchaseOrder.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${purchaseOrder.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="jhipstertestApp.purchaseOrder.home.notFound">No Purchase Orders found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ purchaseOrder }: IRootState) => ({
  purchaseOrderList: purchaseOrder.entities,
  loading: purchaseOrder.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrder);
