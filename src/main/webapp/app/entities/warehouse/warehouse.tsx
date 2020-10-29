import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './warehouse.reducer';
import { IWarehouse } from 'app/shared/model/warehouse.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWarehouseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Warehouse = (props: IWarehouseProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { warehouseList, match, loading } = props;
  return (
    <div>
      <h2 id="warehouse-heading">
        <Translate contentKey="jhipstertestApp.warehouse.home.title">Warehouses</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="jhipstertestApp.warehouse.home.createLabel">Create new Warehouse</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {warehouseList && warehouseList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipstertestApp.warehouse.bagCapacity">Bag Capacity</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipstertestApp.warehouse.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipstertestApp.warehouse.location">Location</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {warehouseList.map((warehouse, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${warehouse.id}`} color="link" size="sm">
                      {warehouse.id}
                    </Button>
                  </td>
                  <td>{warehouse.bagCapacity}</td>
                  <td>{warehouse.name}</td>
                  <td>{warehouse.location ? <Link to={`location/${warehouse.location.id}`}>{warehouse.location.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${warehouse.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${warehouse.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${warehouse.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="jhipstertestApp.warehouse.home.notFound">No Warehouses found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ warehouse }: IRootState) => ({
  warehouseList: warehouse.entities,
  loading: warehouse.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Warehouse);
