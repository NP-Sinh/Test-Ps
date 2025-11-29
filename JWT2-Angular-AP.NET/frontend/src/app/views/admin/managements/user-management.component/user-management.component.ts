import { Component, OnInit } from '@angular/core';
import { UserService, UserWithTokens } from '../../../../services/userServices/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-management',
  imports: [CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  users: UserWithTokens[] = [];
  loading = false;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;

    this.userService.getAllUsers().subscribe({
      next: (response) => {
        if (response.statuscodes === 200 && response.data) {
          this.users = response.data;
        } else {
          this.error = response.message || 'Không thể tải danh sách người dùng';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.error = err.error?.message || 'Đã xảy ra lỗi khi tải danh sách';
        this.loading = false;
      },
    });
  }

  refreshUsers(): void {
    this.loadUsers();
  }

  getUserInitials(fullName: string): string {
    if (!fullName) return '??';
    const names = fullName.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (
      names[0].charAt(0).toUpperCase() +
      names[names.length - 1].charAt(0).toUpperCase()
    );
  }

  getActiveUsersCount(): number {
    return this.users.filter((u) => u.isActive).length;
  }

  getInactiveUsersCount(): number {
    return this.users.filter((u) => !u.isActive).length;
  }

  getAdminCount(): number {
    return this.users.filter((u) => u.role === 'Admin').length;
  }
}
