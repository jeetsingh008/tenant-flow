import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './documentation.html',
})
export class Documentation {
  scrollTo(id: string, event: Event) {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
