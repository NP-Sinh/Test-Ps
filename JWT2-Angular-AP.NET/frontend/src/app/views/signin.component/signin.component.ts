import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/authServices/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  returnUrl: string = '/';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Nếu đã đăng nhập, redirect về home
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }

    // Lấy returnUrl từ query params
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;

    const { username, password } = this.loginForm.value;

    this.authService.signIn(username, password).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.statuscodes === 200) {
          this.successMessage = 'Đăng nhập thành công! Đang chuyển hướng...';
          setTimeout(() => {
            this.router.navigate([this.returnUrl]);
          }, 1000);
        } else {
          this.errorMessage = response.message || 'Đăng nhập thất bại';
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Login error:', err);
        this.errorMessage = err.error?.message || 'Đã xảy ra lỗi, vui lòng thử lại';
      },
    });
  }
}
