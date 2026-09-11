export interface Endpoint {
    id: number;
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    statusCode: number;
    delay: number;
    responseBody: string;
}