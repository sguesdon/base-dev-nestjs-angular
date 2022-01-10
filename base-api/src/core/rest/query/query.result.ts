export type QueryResult<T> = {
  data: T[],
  total: number
}

export const emptyResult: QueryResult<any> = {
  data: [],
  total: 0
};
