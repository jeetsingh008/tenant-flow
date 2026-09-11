import { Component, inject } from '@angular/core';
import { Toast as ToastService } from '../../../services/toast/toast';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  toastService = inject(ToastService);
}
