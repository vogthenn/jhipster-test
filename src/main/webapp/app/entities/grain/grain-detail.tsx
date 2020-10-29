import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './grain.reducer';
import { IGrain } from 'app/shared/model/grain.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGrainDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GrainDetail = (props: IGrainDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { grainEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipstertestApp.grain.detail.title">Grain</Translate> [<b>{grainEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="jhipstertestApp.grain.name">Name</Translate>
            </span>
          </dt>
          <dd>{grainEntity.name}</dd>
          <dt>
            <Translate contentKey="jhipstertestApp.grain.contentType">Content Type</Translate>
          </dt>
          <dd>{grainEntity.contentType ? grainEntity.contentType.id : ''}</dd>
          <dt>
            <Translate contentKey="jhipstertestApp.grain.name">Name</Translate>
          </dt>
          <dd>{grainEntity.name ? grainEntity.name.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/grain" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/grain/${grainEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ grain }: IRootState) => ({
  grainEntity: grain.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GrainDetail);
