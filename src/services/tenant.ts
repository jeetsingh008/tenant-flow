import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

export interface Tenant {
  id: number;
  name: string;
  email: string;
  company: {name: string};
  status: "Active" | "Suspended";

}

@Injectable({
  providedIn: 'root',
})

export class TenantService {
  private http = inject(HttpClient);

  tenants = signal<Tenant[]>([]);
  isLoading = signal<boolean>(false);

  loadTenants() {
    this.isLoading.set(true);

    this.http.get<Tenant[]>('https://jsonplaceholder.typicode.com/users').subscribe({
      next: (data) => {
        const mappedTenants = data.map(user => ({
          ...user,
          status: (Math.random() > 0.2 ? 'Active' : 'Suspended') as "Active" | "Suspended"
        }))

        this.tenants.set(mappedTenants);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    })
  }
}
