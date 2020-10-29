import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './bag.reducer';
import { IBag } from 'app/shared/model/bag.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBagProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Bag = (props: IBagProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { bagList, match, loading } = props;
  return (
    <div>
      <h2 id="bag-heading">
        <Translate contentKey="jhipstertestApp.bag.home.title">Bags</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="jhipstertestApp.bag.home.createLabel">Create new Bag</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {bagList && bagList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipstertestApp.bag.quality">Quality</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipstertestApp.bag.bags">Bags</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bagList.map((bag, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${bag.id}`} color="link" size="sm">
                      {bag.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`jhipstertestApp.QualityGrade.${bag.quality}`} />
                  </td>
                  <td>{bag.bags ? <Link to={`transaction/${bag.bags.id}`}>{bag.bags.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${bag.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bag.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bag.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="jhipstertestApp.bag.home.notFound">No Bags found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ bag }: IRootState) => ({
  bagList: bag.entities,
  loading: bag.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Bag);
