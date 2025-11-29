import { Component, OnInit } from '@angular/core';
import { UserProfile, UserService } from '../../services/userServices/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  loading = false;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.error = null;

    this.userService.getUserProfile().subscribe({
      next: (response) => {
        if (response.statuscodes === 200 && response.data) {
          this.userProfile = response.data;
        } else {
          this.error = response.message || 'Không thể tải thông tin người dùng';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.error = err.error?.message || 'Đã xảy ra lỗi khi tải thông tin';
        this.loading = false;
      },
    });
  }

  refreshProfile(): void {
    this.loadProfile();
  }
}
