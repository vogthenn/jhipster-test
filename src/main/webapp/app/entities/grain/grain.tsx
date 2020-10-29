import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './grain.reducer';
import { IGrain } from 'app/shared/model/grain.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGrainProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Grain = (props: IGrainProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { grainList, match, loading } = props;
  return (
    <div>
      <h2 id="grain-heading">
        <Translate contentKey="jhipstertestApp.grain.home.title">Grains</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="jhipstertestApp.grain.home.createLabel">Create new Grain</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {grainList && grainList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipstertestApp.grain.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipstertestApp.grain.contentType">Content Type</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipstertestApp.grain.name">Name</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {grainList.map((grain, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${grain.id}`} color="link" size="sm">
                      {grain.id}
                    </Button>
                  </td>
                  <td>{grain.name}</td>
                  <td>{grain.contentType ? <Link to={`bag/${grain.contentType.id}`}>{grain.contentType.id}</Link> : ''}</td>
                  <td>{grain.name ? <Link to={`bag/${grain.name.id}`}>{grain.name.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${grain.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${grain.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${grain.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="jhipstertestApp.grain.home.notFound">No Grains found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ grain }: IRootState) => ({
  grainList: grain.entities,
  loading: grain.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Grain);
