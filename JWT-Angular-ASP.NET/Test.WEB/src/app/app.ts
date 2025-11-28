import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/authService/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Test.WEB');

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Tự động refresh token khi app khởi động nếu user đã đăng nhập
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.authService.refreshToken().subscribe({
        error: () => {
          // Nếu refresh thất bại, xóa user khỏi localStorage
          localStorage.removeItem('currentUser');
        }
      });
    }
  }
}
