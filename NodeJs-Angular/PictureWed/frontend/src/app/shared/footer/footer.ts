import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  email = '';
  currentYear = new Date().getFullYear();

  onSubscribe() {
    if (this.email) {
      // Implement subscription logic
      console.log('Subscribe with email:', this.email);
      // Reset form
      this.email = '';
      // Show success message
      alert('Đăng ký thành công!');
    }
  }
}
