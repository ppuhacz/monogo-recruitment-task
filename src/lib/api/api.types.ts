export type QueryResponse = {
  label: string;
  score: number;
};

export type QueryError = {
  error: string;
  estimated_time: number;
};

export type QueryResult = QueryResponse[] | QueryError;
