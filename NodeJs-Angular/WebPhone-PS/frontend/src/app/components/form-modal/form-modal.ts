import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'select' | 'textarea' | 'datetime' | 'password' | 'file';
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  options?: { value: any; label: string }[];
  placeholder?: string;
  colspan?: number;
  rows?: number;
  accept?: string;
  multiple?: boolean;
}

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-modal.html',
  styleUrl: './form-modal.css',
})
export class FormModal {
  @Input() isOpen = false;
  @Input() title = 'Form';
  @Input() fields: FormField[] = [];
  @Input() formData: any = {};
  @Input() submitButtonText = 'Lưu';
  @Input() isSaving = false;
  @Input() errorMessage = '';
  @Input() columns: number = 1;
  @Input() modalSize!: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';

  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<any>();

  filePreviews: { [key: string]: any } = {};

  onClose() {
    if (!this.isSaving) {
      this.closeModal.emit();
      this.filePreviews = {};
    }
  }
  onBackdropClick() {
    this.onClose();
  }
  onSubmit(form: any) {
    if (form.valid && !this.isSaving) {
      this.submitForm.emit({ ...this.formData });
    }
  }
  getColClass(field: FormField): string {
    if (field.colspan) {
      return `col-md-${field.colspan}`;
    }
    const colSize = 12 / this.columns;
    return `col-md-${colSize}`;
  }

  getModalSizeClass(): string {
    switch (this.modalSize) {
      case 'sm':
        return 'modal-sm';
      case 'lg':
        return 'modal-lg';
      case 'xl':
        return 'modal-xl';
      case 'fullscreen':
        return 'modal-fullscreen';
      default:
        return '';
    }
  }
  // Xử lý file upload
  onFileChange(event: any, fieldKey: string) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.formData[fieldKey] = file;

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.filePreviews[fieldKey] = {
            type: 'image',
            url: e.target.result,
            name: file.name,
          };
        };
        reader.readAsDataURL(file);
      } else {
        this.filePreviews[fieldKey] = {
          type: 'file',
          name: file.name,
          size: this.formatFileSize(file.size),
        };
      }
    }
  }
  removeFile(fieldKey: string) {
    this.formData[fieldKey] = null;
    delete this.filePreviews[fieldKey];
  }
  // Format file size
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }
  // Kiểm tra có preview không
  hasPreview(fieldKey: string): boolean {
    return !!this.filePreviews[fieldKey];
  }

  // Lấy preview
  getPreview(fieldKey: string): any {
    return this.filePreviews[fieldKey];
  }

  // DATE INPUT (dd/MM/yyyy)
  private lastDateValue: { [key: string]: string } = {};
  onDateInput(event: any, fieldKey: string) {
    const currentValue = event.target.value;
    const lastValue = this.lastDateValue[fieldKey] || '';

    if (currentValue.length < lastValue.length) {
      this.lastDateValue[fieldKey] = currentValue;
      this.formData[fieldKey] = currentValue;
      return;
    }

    let value = currentValue.replace(/\D/g, '');

    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    if (value.length >= 5) {
      value = value.substring(0, 5) + '/' + value.substring(5);
    }
    if (value.length > 10) {
      value = value.substring(0, 10);
    }

    event.target.value = value;
    this.formData[fieldKey] = value;
    this.lastDateValue[fieldKey] = value;
  }

  onDateBlur(event: any, fieldKey: string) {
    const value = event.target.value;
    if (!value || value === '') return;
    const parts = value.split('/');
    if (parts.length === 3) {
      let day = parts[0].padStart(2, '0');
      let month = parts[1].padStart(2, '0');
      let year = parts[2];
      const dayNum = parseInt(day);
      const monthNum = parseInt(month);
      const yearNum = parseInt(year);

      if (dayNum < 1 || dayNum > 31) {
        this.formData[fieldKey] = '';
        event.target.value = '';
        return;
      }

      if (monthNum < 1 || monthNum > 12) {
        this.formData[fieldKey] = '';
        event.target.value = '';
        return;
      }

      if (year.length === 2) {
        year = yearNum <= 50 ? '20' + year : '19' + year;
      }

      if (year.length !== 4) {
        this.formData[fieldKey] = '';
        event.target.value = '';
        return;
      }
      const formatted = `${day}/${month}/${year}`;
      this.formData[fieldKey] = formatted;
      event.target.value = formatted;
    }
  }
}
