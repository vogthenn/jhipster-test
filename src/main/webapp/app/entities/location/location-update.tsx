import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICountry } from 'app/shared/model/country.model';
import { getEntities as getCountries } from 'app/entities/country/country.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { getEntities as getPeople } from 'app/entities/person/person.reducer';
import { ITransaction } from 'app/shared/model/transaction.model';
import { getEntities as getTransactions } from 'app/entities/transaction/transaction.reducer';
import { IPurchaseOrder } from 'app/shared/model/purchase-order.model';
import { getEntities as getPurchaseOrders } from 'app/entities/purchase-order/purchase-order.reducer';
import { getEntity, updateEntity, createEntity, reset } from './location.reducer';
import { ILocation } from 'app/shared/model/location.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILocationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LocationUpdate = (props: ILocationUpdateProps) => {
  const [countryId, setCountryId] = useState('0');
  const [personId, setPersonId] = useState('0');
  const [locationId, setLocationId] = useState('0');
  const [locationId, setLocationId] = useState('0');
  const [locationId, setLocationId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { locationEntity, countries, people, transactions, purchaseOrders, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/location');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCountries();
    props.getPeople();
    props.getTransactions();
    props.getPurchaseOrders();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...locationEntity,
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
          <h2 id="jhipstertestApp.location.home.createOrEditLabel">
            <Translate contentKey="jhipstertestApp.location.home.createOrEditLabel">Create or edit a Location</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : locationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="location-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="location-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="streetAddressLabel" for="location-streetAddress">
                  <Translate contentKey="jhipstertestApp.location.streetAddress">Street Address</Translate>
                </Label>
                <AvField id="location-streetAddress" type="text" name="streetAddress" />
              </AvGroup>
              <AvGroup>
                <Label id="postalCodeLabel" for="location-postalCode">
                  <Translate contentKey="jhipstertestApp.location.postalCode">Postal Code</Translate>
                </Label>
                <AvField id="location-postalCode" type="text" name="postalCode" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="location-city">
                  <Translate contentKey="jhipstertestApp.location.city">City</Translate>
                </Label>
                <AvField id="location-city" type="text" name="city" />
              </AvGroup>
              <AvGroup>
                <Label id="stateProvinceLabel" for="location-stateProvince">
                  <Translate contentKey="jhipstertestApp.location.stateProvince">State Province</Translate>
                </Label>
                <AvField id="location-stateProvince" type="text" name="stateProvince" />
              </AvGroup>
              <AvGroup>
                <Label id="coordinatesLabel" for="location-coordinates">
                  <Translate contentKey="jhipstertestApp.location.coordinates">Coordinates</Translate>
                </Label>
                <AvField id="location-coordinates" type="text" name="coordinates" />
              </AvGroup>
              <AvGroup>
                <Label for="location-country">
                  <Translate contentKey="jhipstertestApp.location.country">Country</Translate>
                </Label>
                <AvInput id="location-country" type="select" className="form-control" name="country.id">
                  <option value="" key="0" />
                  {countries
                    ? countries.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="location-person">
                  <Translate contentKey="jhipstertestApp.location.person">Person</Translate>
                </Label>
                <AvInput id="location-person" type="select" className="form-control" name="person.id">
                  <option value="" key="0" />
                  {people
                    ? people.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="location-location">
                  <Translate contentKey="jhipstertestApp.location.location">Location</Translate>
                </Label>
                <AvInput id="location-location" type="select" className="form-control" name="location.id">
                  <option value="" key="0" />
                  {people
                    ? people.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="location-location">
                  <Translate contentKey="jhipstertestApp.location.location">Location</Translate>
                </Label>
                <AvInput id="location-location" type="select" className="form-control" name="location.id">
                  <option value="" key="0" />
                  {transactions
                    ? transactions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="location-location">
                  <Translate contentKey="jhipstertestApp.location.location">Location</Translate>
                </Label>
                <AvInput id="location-location" type="select" className="form-control" name="location.id">
                  <option value="" key="0" />
                  {purchaseOrders
                    ? purchaseOrders.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/location" replace color="info">
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
  countries: storeState.country.entities,
  people: storeState.person.entities,
  transactions: storeState.transaction.entities,
  purchaseOrders: storeState.purchaseOrder.entities,
  locationEntity: storeState.location.entity,
  loading: storeState.location.loading,
  updating: storeState.location.updating,
  updateSuccess: storeState.location.updateSuccess,
});

const mapDispatchToProps = {
  getCountries,
  getPeople,
  getTransactions,
  getPurchaseOrders,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LocationUpdate);
