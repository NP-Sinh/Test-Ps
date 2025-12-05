import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-toast-notification',
  imports: [CommonModule],
  templateUrl: './toast-notification.html',
  styleUrl: './toast-notification.css',
})
export class ToastNotification implements OnDestroy {
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'warning' = 'success';
  @Input() duration = 3000;

  show = false;
  private timeoutId: any = null;

  constructor(private cdr: ChangeDetectorRef) {}

  showToast(message: string, type: 'success' | 'error' | 'warning' = 'success', duration?: number) {

    this.clearTimeout();

    this.message = message;
    this.type = type;
    if (duration) {
      this.duration = duration;
    }

    this.show = true;
    this.cdr.detectChanges();

    this.timeoutId = setTimeout(() => {
      this.hide();
    }, this.duration);
  }

  hide() {
    this.clearTimeout();
    this.show = false;
    this.cdr.detectChanges();
  }

  private clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  ngOnDestroy() {
    this.clearTimeout();
  }
}
