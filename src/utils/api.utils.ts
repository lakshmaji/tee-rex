import { QueryParams } from '../types/utils';

export interface ApiOptions {
  method: 'GET';
  headers: Record<string, string>;
  body?: Record<string, any>;
  params?: QueryParams;
}

export const callApi = async (url: string, { params: queryParams, ...options }: ApiOptions) => {
  try {
    const body = JSON.stringify(options.body);
    const request = await fetch(queryParams ? `${url}?${buildQueryParams(queryParams)}` : url, {
      body,
    });

    if (request.status === 204) {
      // No content
      return true;
    }
    const response = await request.json();

    if (request.ok) {
      return response;
    }
    throw new Error(
      response.message ||
        response.error_description ||
        response.error ||
        response.errorCode ||
        'Internal server error',
    );
  } catch (err) {
    console.log('API error ', err);
    throw err;
  }
};

/**
 * Generate the query string for a given key-value pairs
 * @param params
 * @returns string -> Returns a valid Unified resource url query string
 */
const buildQueryParams = (params: QueryParams): string => {
  return Object.keys(params).reduce((acc: string, paramKey: string, i: number) => {
    acc += `${i === 0 ? '?' : '&'}${paramKey}=${encodeURIComponent(params[paramKey])}`;
    return acc;
  }, '');
};

export const DEFAULT_GET_OPTIONS: ApiOptions = {
  method: 'GET',
  headers: {},
};
