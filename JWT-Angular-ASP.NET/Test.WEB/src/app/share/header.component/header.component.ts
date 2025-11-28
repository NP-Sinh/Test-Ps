import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isManagementDropdownOpen = false;
  currentUser: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleManagementDropdown() {
    this.isManagementDropdownOpen = !this.isManagementDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.management-dropdown')) {
      this.isManagementDropdownOpen = false;
    }
  }

  logout() {
    this.authService.logout().subscribe({
      next: (response) => {
        if (response.statuscodes === 200) {
          this.router.navigate(['/signin']);
        }
      },
      error: (error) => {
        console.error('Logout error:', error);
        // Vẫn chuyển hướng về login nếu có lỗi
        this.router.navigate(['/signin']);
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
