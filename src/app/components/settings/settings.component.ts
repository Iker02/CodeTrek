import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  screenSize: 'sm' | 'md' | 'xl' | '2xl' = 'xl';
  showPopup = false;
  profiles = Array(10);
  selectedProfile: number | null = null;


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateScreenSize();
  }

  ngOnInit() {
    this.updateScreenSize();
  }

  updateScreenSize() {
    const width = window.innerWidth;
    if (width < 768) {
      this.screenSize = 'sm';
    } else if (width < 1280) {
      this.screenSize = 'md';
    } else if (width < 1536) {
      this.screenSize = 'xl';
    } else {
      this.screenSize = '2xl';
    }
  }
}