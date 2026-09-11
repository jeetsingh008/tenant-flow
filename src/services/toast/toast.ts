import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  text: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class Toast {
  toast = signal<ToastMessage | null>(null);

  private timeOutId: any = null;

  show(text: string, type: 'success' | 'error' = 'success'){
     if(this.timeOutId){
      clearTimeout(this.timeOutId);
     } 

     this.toast.set({text, type});

     this.timeOutId = setTimeout(() => {
      this.toast.set(null);
     }, 3000);
  }
}
