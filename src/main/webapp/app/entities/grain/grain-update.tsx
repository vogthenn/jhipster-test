import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBag } from 'app/shared/model/bag.model';
import { getEntities as getBags } from 'app/entities/bag/bag.reducer';
import { getEntity, updateEntity, createEntity, reset } from './grain.reducer';
import { IGrain } from 'app/shared/model/grain.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IGrainUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GrainUpdate = (props: IGrainUpdateProps) => {
  const [contentTypeId, setContentTypeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { grainEntity, bags, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/grain');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getBags();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...grainEntity,
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
          <h2 id="jhipstertestApp.grain.home.createOrEditLabel">
            <Translate contentKey="jhipstertestApp.grain.home.createOrEditLabel">Create or edit a Grain</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : grainEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="grain-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="grain-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="grain-name">
                  <Translate contentKey="jhipstertestApp.grain.name">Name</Translate>
                </Label>
                <AvField id="grain-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label for="grain-contentType">
                  <Translate contentKey="jhipstertestApp.grain.contentType">Content Type</Translate>
                </Label>
                <AvInput id="grain-contentType" type="select" className="form-control" name="contentType.id">
                  <option value="" key="0" />
                  {bags
                    ? bags.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/grain" replace color="info">
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
  bags: storeState.bag.entities,
  grainEntity: storeState.grain.entity,
  loading: storeState.grain.loading,
  updating: storeState.grain.updating,
  updateSuccess: storeState.grain.updateSuccess,
});

const mapDispatchToProps = {
  getBags,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GrainUpdate);
