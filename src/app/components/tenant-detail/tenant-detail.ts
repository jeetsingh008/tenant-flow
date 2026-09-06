import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tenant-detail',
  imports: [RouterLink],
  templateUrl: './tenant-detail.html',
  styleUrl: './tenant-detail.css',
})
export class TenantDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  
  tenantDetails = signal<any>(null);
  isLoading = signal<boolean>(true);

  // To be implemented
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`).subscribe({
        next: (data) => {
          this.tenantDetails.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.log('Error fetching tenant', err);
          this.isLoading.set(false);
        }
      })
    }
  }
  
}
