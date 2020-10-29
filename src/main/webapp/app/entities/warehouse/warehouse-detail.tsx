import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './warehouse.reducer';
import { IWarehouse } from 'app/shared/model/warehouse.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWarehouseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WarehouseDetail = (props: IWarehouseDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { warehouseEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipstertestApp.warehouse.detail.title">Warehouse</Translate> [<b>{warehouseEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="bagCapacity">
              <Translate contentKey="jhipstertestApp.warehouse.bagCapacity">Bag Capacity</Translate>
            </span>
          </dt>
          <dd>{warehouseEntity.bagCapacity}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="jhipstertestApp.warehouse.name">Name</Translate>
            </span>
          </dt>
          <dd>{warehouseEntity.name}</dd>
          <dt>
            <Translate contentKey="jhipstertestApp.warehouse.location">Location</Translate>
          </dt>
          <dd>{warehouseEntity.location ? warehouseEntity.location.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/warehouse" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/warehouse/${warehouseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ warehouse }: IRootState) => ({
  warehouseEntity: warehouse.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseDetail);
