// src/app/models/server.model.ts
export interface MockServer {
  id: number;
  name: string;        
  port: number;        
  globalPrefix: string; 
}

export interface Endpoint {
  id: number;
  serverId: number; 
  path: string;
  //... keep existing properties: method, statusCode, delay, responseBody
}