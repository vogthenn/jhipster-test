import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IGrain, defaultValue } from 'app/shared/model/grain.model';

export const ACTION_TYPES = {
  FETCH_GRAIN_LIST: 'grain/FETCH_GRAIN_LIST',
  FETCH_GRAIN: 'grain/FETCH_GRAIN',
  CREATE_GRAIN: 'grain/CREATE_GRAIN',
  UPDATE_GRAIN: 'grain/UPDATE_GRAIN',
  DELETE_GRAIN: 'grain/DELETE_GRAIN',
  RESET: 'grain/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGrain>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type GrainState = Readonly<typeof initialState>;

// Reducer

export default (state: GrainState = initialState, action): GrainState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GRAIN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GRAIN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_GRAIN):
    case REQUEST(ACTION_TYPES.UPDATE_GRAIN):
    case REQUEST(ACTION_TYPES.DELETE_GRAIN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_GRAIN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GRAIN):
    case FAILURE(ACTION_TYPES.CREATE_GRAIN):
    case FAILURE(ACTION_TYPES.UPDATE_GRAIN):
    case FAILURE(ACTION_TYPES.DELETE_GRAIN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_GRAIN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_GRAIN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_GRAIN):
    case SUCCESS(ACTION_TYPES.UPDATE_GRAIN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_GRAIN):
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

const apiUrl = 'api/grains';

// Actions

export const getEntities: ICrudGetAllAction<IGrain> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_GRAIN_LIST,
  payload: axios.get<IGrain>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IGrain> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GRAIN,
    payload: axios.get<IGrain>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IGrain> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GRAIN,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGrain> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GRAIN,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGrain> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GRAIN,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
