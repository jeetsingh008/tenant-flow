import { Component, inject, signal } from '@angular/core';
import { form, required, minLength, submit, pattern, min } from '@angular/forms/signals'
import { EndpointService } from '../../../services/endpoint/endpoint-service';
import { Router } from '@angular/router';
import { Toast } from '../../../services/toast/toast';
import { Endpoint } from '../../models/endpoint.model';

@Component({
  selector: 'app-endpoint-builder',
  imports: [],
  templateUrl: './endpoint-builder.html',
  styleUrl: './endpoint-builder.css',
})

export class EndpointBuilder {
  private endpointService = inject(EndpointService);
  private router = inject(Router);
  private toastService = inject(Toast);

  endpointModel = signal<Omit<Endpoint, 'id'>>({
    path: '',
    method: 'GET',
    statusCode: 200,
    delay: 0,
    responseBody: ''
  })

  endpointForm = form(this.endpointModel, (schema) => {
    required(schema.path, {message: "The endpoint path is required."});
    pattern(schema.path, /^\/.+/, { message: "Path must start with a \"/\" and contain at least one character." });
    // required is sufficient for a select dropdown
    required(schema.method); 

    // Custom status codes are required and must be numeric
    required(schema.statusCode, { message: 'A valid response status code is required.' });
    
    // Pattern for positive numbers
    min(schema.delay, 0, { message: 'Delay must be a positive number.' });

    required(schema.responseBody, { message: 'The JSON response body is required.' });
    minLength(schema.responseBody, 2, { message: 'Response body cannot be empty.' }); // At least `{}`
  })

  onSubmit(event: Event){
      event.preventDefault();

      submit(this.endpointForm, {
      action: async (form) => {
        const newEndpointData = this.endpointModel();

        this.endpointService.addEndpoint(newEndpointData);

        this.toastService.show(`Endpoint ${newEndpointData.path} created successfully!`, 'success');
        this.router.navigate(['/']); // Redirect to dashboard
        
        return undefined; // Signals forms expect an error object or undefined returned
      }
    });
  }
}