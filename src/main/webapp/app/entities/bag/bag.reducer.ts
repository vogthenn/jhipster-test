import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBag, defaultValue } from 'app/shared/model/bag.model';

export const ACTION_TYPES = {
  FETCH_BAG_LIST: 'bag/FETCH_BAG_LIST',
  FETCH_BAG: 'bag/FETCH_BAG',
  CREATE_BAG: 'bag/CREATE_BAG',
  UPDATE_BAG: 'bag/UPDATE_BAG',
  DELETE_BAG: 'bag/DELETE_BAG',
  RESET: 'bag/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBag>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type BagState = Readonly<typeof initialState>;

// Reducer

export default (state: BagState = initialState, action): BagState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BAG_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BAG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BAG):
    case REQUEST(ACTION_TYPES.UPDATE_BAG):
    case REQUEST(ACTION_TYPES.DELETE_BAG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_BAG_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BAG):
    case FAILURE(ACTION_TYPES.CREATE_BAG):
    case FAILURE(ACTION_TYPES.UPDATE_BAG):
    case FAILURE(ACTION_TYPES.DELETE_BAG):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BAG_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BAG):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BAG):
    case SUCCESS(ACTION_TYPES.UPDATE_BAG):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_BAG):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/bags';

// Actions

export const getEntities: ICrudGetAllAction<IBag> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BAG_LIST,
  payload: axios.get<IBag>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IBag> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BAG,
    payload: axios.get<IBag>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IBag> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BAG,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBag> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BAG,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBag> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BAG,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
