import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bag.reducer';
import { IBag } from 'app/shared/model/bag.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBagDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BagDetail = (props: IBagDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bagEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipstertestApp.bag.detail.title">Bag</Translate> [<b>{bagEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quality">
              <Translate contentKey="jhipstertestApp.bag.quality">Quality</Translate>
            </span>
          </dt>
          <dd>{bagEntity.quality}</dd>
          <dt>
            <Translate contentKey="jhipstertestApp.bag.bags">Bags</Translate>
          </dt>
          <dd>{bagEntity.bags ? bagEntity.bags.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/bag" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bag/${bagEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ bag }: IRootState) => ({
  bagEntity: bag.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BagDetail);
