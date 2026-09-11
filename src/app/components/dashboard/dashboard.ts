import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TenantService } from '../../../services/tenant';
import { RouterLink } from "@angular/router";
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, RouterLink, ThemeToggle],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  tenantService = inject(TenantService);
  
  // Bind directly to the service's signals
  tenants = this.tenantService.tenants;
  isLoading = this.tenantService.isLoading;

  searchQuery = signal<string>('');

  debouncedSearch = toSignal(
    toObservable(this.searchQuery).pipe(
      debounceTime(300),
      distinctUntilChanged()
    ),
    {initialValue: ''}
  )

  filteredTenants = computed(() => {
    const query = this.debouncedSearch().toLocaleLowerCase();

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
