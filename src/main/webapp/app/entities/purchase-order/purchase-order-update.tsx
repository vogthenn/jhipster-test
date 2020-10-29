import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILocation } from 'app/shared/model/location.model';
import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { getEntity, updateEntity, createEntity, reset } from './purchase-order.reducer';
import { IPurchaseOrder } from 'app/shared/model/purchase-order.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPurchaseOrderUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PurchaseOrderUpdate = (props: IPurchaseOrderUpdateProps) => {
  const [locationId, setLocationId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { purchaseOrderEntity, locations, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/purchase-order');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getLocations();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...purchaseOrderEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipstertestApp.purchaseOrder.home.createOrEditLabel">
            <Translate contentKey="jhipstertestApp.purchaseOrder.home.createOrEditLabel">Create or edit a PurchaseOrder</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : purchaseOrderEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="purchase-order-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="purchase-order-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="desiredQuantityLabel" for="purchase-order-desiredQuantity">
                  <Translate contentKey="jhipstertestApp.purchaseOrder.desiredQuantity">Desired Quantity</Translate>
                </Label>
                <AvField id="purchase-order-desiredQuantity" type="string" className="form-control" name="desiredQuantity" />
              </AvGroup>
              <AvGroup>
                <Label id="desiredQualityLabel" for="purchase-order-desiredQuality">
                  <Translate contentKey="jhipstertestApp.purchaseOrder.desiredQuality">Desired Quality</Translate>
                </Label>
                <AvField id="purchase-order-desiredQuality" type="text" name="desiredQuality" />
              </AvGroup>
              <AvGroup>
                <Label for="purchase-order-location">
                  <Translate contentKey="jhipstertestApp.purchaseOrder.location">Location</Translate>
                </Label>
                <AvInput id="purchase-order-location" type="select" className="form-control" name="location.id">
                  <option value="" key="0" />
                  {locations
                    ? locations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/purchase-order" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  locations: storeState.location.entities,
  purchaseOrderEntity: storeState.purchaseOrder.entity,
  loading: storeState.purchaseOrder.loading,
  updating: storeState.purchaseOrder.updating,
  updateSuccess: storeState.purchaseOrder.updateSuccess,
});

const mapDispatchToProps = {
  getLocations,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderUpdate);
