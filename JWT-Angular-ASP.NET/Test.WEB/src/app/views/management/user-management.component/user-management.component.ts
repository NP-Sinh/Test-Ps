import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/userService/user.service';
import { AuthService } from '../../../services/authService/auth.service';

@Component({
  selector: 'app-user-management',
  imports: [CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.isAdmin()) {
      this.loadAllUsers();
    }
  }

  loadAllUsers() {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.statuscodes === 200) {
          this.users = response.data;
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Lỗi khi tải danh sách người dùng';
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
