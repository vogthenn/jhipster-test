import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITransaction } from 'app/shared/model/transaction.model';
import { getEntities as getTransactions } from 'app/entities/transaction/transaction.reducer';
import { getEntity, updateEntity, createEntity, reset } from './bag.reducer';
import { IBag } from 'app/shared/model/bag.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBagUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BagUpdate = (props: IBagUpdateProps) => {
  const [bagsId, setBagsId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { bagEntity, transactions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/bag');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTransactions();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...bagEntity,
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
          <h2 id="jhipstertestApp.bag.home.createOrEditLabel">
            <Translate contentKey="jhipstertestApp.bag.home.createOrEditLabel">Create or edit a Bag</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bagEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="bag-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="bag-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="qualityLabel" for="bag-quality">
                  <Translate contentKey="jhipstertestApp.bag.quality">Quality</Translate>
                </Label>
                <AvInput
                  id="bag-quality"
                  type="select"
                  className="form-control"
                  name="quality"
                  value={(!isNew && bagEntity.quality) || 'GOOD'}
                >
                  <option value="GOOD">{translate('jhipstertestApp.QualityGrade.GOOD')}</option>
                  <option value="OK">{translate('jhipstertestApp.QualityGrade.OK')}</option>
                  <option value="SOSO">{translate('jhipstertestApp.QualityGrade.SOSO')}</option>
                  <option value="BAD">{translate('jhipstertestApp.QualityGrade.BAD')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="bag-bags">
                  <Translate contentKey="jhipstertestApp.bag.bags">Bags</Translate>
                </Label>
                <AvInput id="bag-bags" type="select" className="form-control" name="bags.id">
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
              <Button tag={Link} id="cancel-save" to="/bag" replace color="info">
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
  transactions: storeState.transaction.entities,
  bagEntity: storeState.bag.entity,
  loading: storeState.bag.loading,
  updating: storeState.bag.updating,
  updateSuccess: storeState.bag.updateSuccess,
});

const mapDispatchToProps = {
  getTransactions,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BagUpdate);
