// src/app/services/server.service.ts
import { Injectable, signal, computed, effect } from '@angular/core';
import { MockServer } from '../../app/models/server.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private storageKey = 'api_kiba_servers';
  private activeIdKey = 'api_kiba_active_server';

  private getInitialServers(): MockServer[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [
      { id: 1, name: 'Default Localhost', port: 3000, globalPrefix: '/api' }
    ];
  }

  servers = signal<MockServer[]>(this.getInitialServers());
  
  activeServerId = signal<number>(
    Number(localStorage.getItem(this.activeIdKey)) || 1
  );

  activeServer = computed(() => {
    return this.servers().find(s => s.id === this.activeServerId()) || this.servers()[0];
  });

  constructor() {
    effect(() => localStorage.setItem(this.storageKey, JSON.stringify(this.servers())));
    effect(() => localStorage.setItem(this.activeIdKey, this.activeServerId().toString()));
  }

  addServer(server: Omit<MockServer, 'id'>) {
    const newServer = { ...server, id: Date.now() };
    this.servers.update(current => [...current, newServer]);
  }

  setActiveServer(id: number) {
    this.activeServerId.set(id);
  }

  deleteServer(id: number) {
    this.servers.update(current => current.filter(s => s.id !== id));
    if (this.activeServerId() === id) {
      this.activeServerId.set(this.servers()[0]?.id || 0);
    }
  }
}