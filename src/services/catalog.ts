import { GET_CATALOG } from '../constants';
import { callApi, DEFAULT_GET_OPTIONS } from '../utils/api.utils';

export const getCatalog = () => {
  return callApi(GET_CATALOG, DEFAULT_GET_OPTIONS);
};
