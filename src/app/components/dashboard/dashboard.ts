import { Component, computed, inject, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { EndpointService } from '../../../services/endpoint/endpoint-service';
import { Toast as ToastService } from '../../../services/toast/toast';
import { Endpoint } from '../../models/endpoint.model';
import { Simulator } from '../simulator/simulator';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, RouterLink, Simulator],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private endpointService = inject(EndpointService);
  private toastService = inject(ToastService);

  // Expose the raw data signal from service
  endpoints = this.endpointService.endpoints;

  // A. This signal tracks every keystroke instantly for responsive typing.
  rawSearchQuery = signal('');

  // B. Debouncing Pipeline:
  // Convert 'rawSearchQuery' to Observable -> pipe operators -> convert back to Signal.
  search = toSignal(
    toObservable(this.rawSearchQuery).pipe(
      debounceTime(300),
      distinctUntilChanged()
    ),
    { initialValue: '' }
  );

  // Computed Signal: Derived state that filters the list automatically.
  filteredEndpoints = computed(() => {
    const query = this.search().toLowerCase();

    if (!query) return this.endpoints();

    return this.endpoints().filter(ep =>
      ep.path.toLowerCase().includes(query) ||
      ep.method.toLowerCase().includes(query)
    );
  });

  selectedEndpointId = signal<number | null>(null);

  selectedEndpoint = computed(() => {
    const id = this.selectedEndpointId();
    if (id === null) return null;
    return this.endpoints().find(ep => ep.id === id) || null;
  });

  constructor() {
    // Automatically select the first endpoint if none is selected
    effect(() => {
      const endpoints = this.filteredEndpoints();
      const selected = this.selectedEndpointId();
      
      if (endpoints.length > 0 && selected === null) {
        // use setTimeout or untracked to avoid signal writing during effect, but setting signal in effect is ok if it doesn't cause infinite loop.
        // It's better to just do it directly.
        this.selectedEndpointId.set(endpoints[0].id);
      } else if (endpoints.length === 0 && selected !== null) {
        this.selectedEndpointId.set(null);
      }
    }, { allowSignalWrites: true });
  }

  selectEndpoint(id: number) {
    this.selectedEndpointId.set(id);
  }

  onDelete(id: number, event: Event) {
    event.stopPropagation();
    this.endpointService.deleteEndpoint(id);
    this.toastService.show('Endpoint deleted successfully', 'error');
  }

  // Helper function for styling HTTP methods
  getMethodColor(method: Endpoint['method']): string {
    switch (method) {
      case 'GET': return 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400';
      case 'POST': return 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'PUT': return 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400';
      case 'DELETE': return 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  }
}
