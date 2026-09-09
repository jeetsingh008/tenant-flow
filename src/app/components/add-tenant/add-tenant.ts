import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals'; // 👈 Make sure to import FormRoot here
import { TenantService } from '../../../services/tenant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tenant',
  imports: [FormField, FormRoot],
  templateUrl: './add-tenant.html',
  styleUrl: './add-tenant.css',
})
export class AddTenant {
  private tenantService = inject(TenantService);
  private router = inject(Router);

  tenantModel = signal({
    name: '',
    email: '',
    companyName: ''
  });

  tenantForm = form(
    this.tenantModel, 
    (schema) => {
      required(schema.name, {message: "Name is required."}),
      minLength(schema.name, 3, {message: 'Name must be at least 3 characters.'}),

      required(schema.email, {message: 'Admin Email is required.'}),
      email(schema.email, {message: 'Please enter a valid Email.' }),

      required(schema.companyName, {message: 'Organisation Name is required.'})
    }, 
    {
      submission: {
        action: async () => {
          const formValue = this.tenantModel();

          this.tenantService.tenants.update(current => [
            {
              id: Date.now(),
              name: formValue.name,
              email: formValue.email,
              company: {name: formValue.companyName},
              status: 'Active'
            },
            ...current
          ]);

          this.router.navigate(['/dashboard']);
        }
      }
    }
  );
}
