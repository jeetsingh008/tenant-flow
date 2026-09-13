import { effect, Injectable, signal } from '@angular/core';
import { Endpoint } from '../../app/models/endpoint.model';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  private storageKey = 'tab_api_endpoints';

  private getInitialEndpoints(): Endpoint[] {
    const stored = localStorage.getItem(this.storageKey);

    if(stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing stored endpoints:', error);
      }
    }
  return [
      {
        id: Date.now(),
        serverId: 1,
        path: '/api/v1/users',
        method: 'GET',
        statusCode: 200,
        delay: 300,
        responseBody: JSON.stringify([
          { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz' },
          { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv' }
        ], null, 2)
      },
      {
        id: Date.now() + 1,
        serverId: 1,
        path: '/api/v1/status',
        method: 'GET',
        statusCode: 200,
        delay: 100,
        responseBody: JSON.stringify({ status: 'UP', version: '1.0.0' }, null, 2)
      }
    ];
  }
  
  endpoints = signal<Endpoint[]>(this.getInitialEndpoints());

  constructor() {
    effect(() => {
      const currentEndpoints = this.endpoints();
      localStorage.setItem(this.storageKey, JSON.stringify(currentEndpoints));
    });
  }

  addEndpoint(endpoint: Omit<Endpoint, 'id'>) {
     this.endpoints.update(current => [...current, {...endpoint, id: Date.now()}]);
  }

  updateEndpoint(id: number, updatedData: Partial<Omit<Endpoint, 'id'>>){
    this.endpoints.update((current) => current.map((ep) => ep.id === id ? {...ep, ...updatedData} : ep));
  }

  deleteEndpoint(id: number) {
    this.endpoints.update(current => current.filter((ep) => ep.id !== id));
  }

  getEndpointById(id: number): Endpoint | undefined {
    return this.endpoints().find(ep => ep.id === id);
  }
}
