import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserProfile, UserService } from '../../services/userService/user.service';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.isLoading = true;
    this.userService.getProfile().subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response.statuscodes === 200) {
          this.userProfile = response.data;
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Lỗi khi tải thông tin';
      }
    });
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }
}
