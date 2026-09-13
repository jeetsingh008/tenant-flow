import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServerService } from '../../../services/server/server-service';
import { Toast } from '../../../services/toast/toast';
import { MockServer } from '../../models/server.model';
import { form, required, submit, min, FormField, FormRoot } from '@angular/forms/signals';

@Component({
  selector: 'app-mock-servers',
  standalone: true,
  imports: [FormsModule, FormField, FormRoot],
  templateUrl: './mock-servers.html',
})
export class MockServers {
  serverService = inject(ServerService);
  toastService = inject(Toast);
  
  servers = this.serverService.servers;
  activeServerId = this.serverService.activeServerId;

  isAdding = signal(false);

  newServerModel = signal<Omit<MockServer, 'id'>>({
    name: '',
    port: 3001,
    globalPrefix: '/api/v1'
  });

  serverForm = form(this.newServerModel, (schema) => {
    required(schema.name, { message: 'Server name is required.' });
    required(schema.port, { message: 'Port is required.' });
    min(schema.port, 1, { message: 'Port must be a valid number.' });
    required(schema.globalPrefix, { message: 'Global prefix is required.' });
  });

  onAddServer() {
    this.isAdding.set(true);
  }

  cancelAdd() {
    this.isAdding.set(false);
    this.newServerModel.set({ name: '', port: 3001, globalPrefix: '/api/v1' });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    submit(this.serverForm, {
      action: async () => {
        const data = this.newServerModel();
        this.serverService.addServer(data);
        this.toastService.show(`Server ${data.name} added successfully!`, 'success');
        this.cancelAdd();
        return undefined;
      }
    });
  }

  deleteServer(id: number) {
    this.serverService.deleteServer(id);
    this.toastService.show('Server deleted', 'error');
  }

  makeActive(id: number) {
    this.serverService.setActiveServer(id);
    this.toastService.show('Active server changed', 'success');
  }
}
