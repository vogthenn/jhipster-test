import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILocation } from 'app/shared/model/location.model';
import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { getEntity, updateEntity, createEntity, reset } from './person.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPersonUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PersonUpdate = (props: IPersonUpdateProps) => {
  const [locationId, setLocationId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { personEntity, locations, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/person');
  };

  useEffect(() => {
    if (!isNew) {
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
    values.hireDate = convertDateTimeToServer(values.hireDate);

    if (errors.length === 0) {
      const entity = {
        ...personEntity,
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
          <h2 id="jhipstertestApp.person.home.createOrEditLabel">
            <Translate contentKey="jhipstertestApp.person.home.createOrEditLabel">Create or edit a Person</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : personEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="person-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="person-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="firstNameLabel" for="person-firstName">
                  <Translate contentKey="jhipstertestApp.person.firstName">First Name</Translate>
                </Label>
                <AvField id="person-firstName" type="text" name="firstName" />
                <UncontrolledTooltip target="firstNameLabel">
                  <Translate contentKey="jhipstertestApp.person.help.firstName" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="person-lastName">
                  <Translate contentKey="jhipstertestApp.person.lastName">Last Name</Translate>
                </Label>
                <AvField id="person-lastName" type="text" name="lastName" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="person-email">
                  <Translate contentKey="jhipstertestApp.person.email">Email</Translate>
                </Label>
                <AvField id="person-email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="person-phoneNumber">
                  <Translate contentKey="jhipstertestApp.person.phoneNumber">Phone Number</Translate>
                </Label>
                <AvField id="person-phoneNumber" type="text" name="phoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="hireDateLabel" for="person-hireDate">
                  <Translate contentKey="jhipstertestApp.person.hireDate">Hire Date</Translate>
                </Label>
                <AvInput
                  id="person-hireDate"
                  type="datetime-local"
                  className="form-control"
                  name="hireDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.personEntity.hireDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="salaryLabel" for="person-salary">
                  <Translate contentKey="jhipstertestApp.person.salary">Salary</Translate>
                </Label>
                <AvField id="person-salary" type="string" className="form-control" name="salary" />
              </AvGroup>
              <AvGroup>
                <Label id="commissionPctLabel" for="person-commissionPct">
                  <Translate contentKey="jhipstertestApp.person.commissionPct">Commission Pct</Translate>
                </Label>
                <AvField id="person-commissionPct" type="string" className="form-control" name="commissionPct" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/person" replace color="info">
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
  personEntity: storeState.person.entity,
  loading: storeState.person.loading,
  updating: storeState.person.updating,
  updateSuccess: storeState.person.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonUpdate);
