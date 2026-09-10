import { effect, Injectable, signal } from '@angular/core';

type ThemeType = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class Theme {

  private getInitialTheme(): ThemeType {
     const savedTheme = localStorage.getItem('theme') as ThemeType;
     if(savedTheme) return savedTheme;
     return window.matchMedia('(prefers-color-scheme: dark').matches ? 'dark' : 'light';
    }

    theme = signal<ThemeType>(this.getInitialTheme());

    constructor() {
      effect(() => {
        const currentTheme = this.theme();

        document.documentElement.classList.toggle('dark', currentTheme === 'dark');
        localStorage.setItem('theme', currentTheme);
      })
    }

    toggleTheme() {
      this.theme.update(prev => (prev === 'light' ? 'dark' : 'light'));
    }
}
