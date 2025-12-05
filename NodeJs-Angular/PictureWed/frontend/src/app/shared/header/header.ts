import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isMobileMenuOpen = false;
  hasNotifications = true;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  onSearch() {
    // Implement search logic
    console.log('Search clicked');
  }

  onNotification() {
    // Implement notification logic
    console.log('Notification clicked');
  }

  onUpload() {
    // Implement upload logic
    console.log('Upload clicked');
  }
}
