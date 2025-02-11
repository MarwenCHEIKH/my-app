import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DarkModeService } from './shared/services/dark-mode.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, NavbarComponent],
})
export class AppComponent {
  title = 'frontend';
  isDarkMode = false; // State for dark mode in AppComponent

  constructor(
    private darkModeService: DarkModeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode === 'true') {
        this.isDarkMode = true;
      }
      this.subscribeToDarkMode();
    }
  }
  subscribeToDarkMode(): void {
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode; // Update local state when the service state changes
      if (isPlatformBrowser(this.platformId)) {
        document.documentElement.classList.toggle('dark-mode', this.isDarkMode);
        // Save dark mode state to localStorage whenever it changes
        localStorage.setItem('darkMode', String(this.isDarkMode));
      }
    });
  }
}
