import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private isDarkModeSubject: BehaviorSubject<boolean>;
  isDarkMode$;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    let initialDarkMode = false;

    if (isPlatformBrowser(this.platformId)) {
      const savedDarkMode = localStorage.getItem('darkMode');
      initialDarkMode = savedDarkMode === 'true';
    }

    this.isDarkModeSubject = new BehaviorSubject<boolean>(initialDarkMode);
    this.isDarkMode$ = this.isDarkModeSubject.asObservable();
  }

  toggleDarkMode() {
    const newState = !this.isDarkModeSubject.value;
    this.isDarkModeSubject.next(newState);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('darkMode', String(newState));
    }
  }
}
