import { Component, inject } from '@angular/core';
import { Theme } from '../../../services/theme/theme';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
})
export class ThemeToggle {
  themeService = inject(Theme);
}
