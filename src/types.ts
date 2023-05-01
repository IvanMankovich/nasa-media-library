export interface IApiError {
  message: string;
  description: string;
  statusCode: string | number;
  response: {
    status: number;
  }
}