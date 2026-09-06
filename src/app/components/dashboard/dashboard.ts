import { Component, computed, inject, signal } from '@angular/core';
import { Tenant, TenantService } from '../../../services/tenant';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  tenantService = inject(TenantService);
  tenants = signal<Tenant[]>([]);
  isLoading = signal<boolean>(false);

  searchQuery = signal<string>('');

  filteredTenants = computed(() => {
    const query = this.searchQuery().toLocaleLowerCase();

    return this.tenants().filter(t => 
      t.name.toLowerCase().includes(query) ||
      t.company.name.toLowerCase().includes(query)
    )
  })

  ngOnInit() {
    this.tenantService.loadTenants();
  }

  onSuspend(id: number) {
    this.tenantService.suspendTenant(id);
  }
}
