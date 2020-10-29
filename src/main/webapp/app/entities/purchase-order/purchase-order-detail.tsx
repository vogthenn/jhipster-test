import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './purchase-order.reducer';
import { IPurchaseOrder } from 'app/shared/model/purchase-order.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPurchaseOrderDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PurchaseOrderDetail = (props: IPurchaseOrderDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { purchaseOrderEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipstertestApp.purchaseOrder.detail.title">PurchaseOrder</Translate> [<b>{purchaseOrderEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="desiredQuantity">
              <Translate contentKey="jhipstertestApp.purchaseOrder.desiredQuantity">Desired Quantity</Translate>
            </span>
          </dt>
          <dd>{purchaseOrderEntity.desiredQuantity}</dd>
          <dt>
            <span id="desiredQuality">
              <Translate contentKey="jhipstertestApp.purchaseOrder.desiredQuality">Desired Quality</Translate>
            </span>
          </dt>
          <dd>{purchaseOrderEntity.desiredQuality}</dd>
        </dl>
        <Button tag={Link} to="/purchase-order" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/purchase-order/${purchaseOrderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ purchaseOrder }: IRootState) => ({
  purchaseOrderEntity: purchaseOrder.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderDetail);
