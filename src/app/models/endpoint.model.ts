export interface Endpoint {
    id: number;
    serverId: number;
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    statusCode: number;
    delay: number;
    responseBody: string;
}