export interface AnyObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

export type QueryParams = Record<string, string | number | boolean>;
