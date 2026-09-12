// src/app/components/simulator/simulator.component.ts
import { Component, input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Endpoint } from '../../models/endpoint.model';
import { Toast } from '../../../services/toast/toast';

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simulator.html',
  styleUrls: ['./simulator.css']
})
export class Simulator {
  endpoint = input.required<Endpoint>();
  
  private toastService = inject(Toast);

  isSimulating = signal(false);
  simulatedResponse = signal<string | null>(null);

  async triggerSimulation() {
    this.isSimulating.set(true);
    this.simulatedResponse.set(null);

    await new Promise(resolve => setTimeout(resolve, this.endpoint().delay));

    this.simulatedResponse.set(this.endpoint().responseBody);
    this.isSimulating.set(false);

    this.toastService.show(
      `Endpoint ${this.endpoint().path} executed with ${this.endpoint().statusCode} OK.`, 
      'success'
    );
  }
}