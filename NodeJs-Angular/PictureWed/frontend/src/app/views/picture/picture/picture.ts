import { Component } from '@angular/core';
import { FormField, FormModal } from '../../../components/form-modal/form-modal';
import { CommonModule } from '@angular/common';
import { PictureService } from '../../../services/picture-services/picture.service';

@Component({
  selector: 'app-picture',
  imports: [CommonModule, FormModal],
  templateUrl: './picture.html',
  styleUrl: './picture.css',
})
export class Picture {
  pictures: any[] = [];

  isModalOpen = false;
  modalTitle = 'Thêm hình ảnh mới';
  isSaving = false;
  currentId: string | null = null;
  formData: any = {};

  formFields: FormField[] = [
    { key: 'name', label: 'Tên hình ảnh', type: 'text', required: true, colspan: 3 },
    {
      key: 'category',
      label: 'Danh mục',
      type: 'text',
      required: true,
      colspan: 3,
    },
    { key: 'mainImage', label: 'Ảnh đại diện', type: 'file', required: true, colspan: 3 },
    { key: 'subImages', label: 'Ảnh chi tiết', type: 'file', multiple: true, colspan: 3 },
  ];

  constructor(private pictureService: PictureService) {}

  ngOnInit() {
    this.loadPictures();
  }

  loadPictures() {
    this.pictureService.getPictures().subscribe({
      next: (res) => (this.pictures = res),
      error: (err) => console.error(err),
    });
  }

  openCreateModal() {
    this.modalTitle = 'Thêm hình ảnh mới';
    this.currentId = null;
    this.formData = {};
    this.isModalOpen = true;
  }

  openEditModal(item: any) {
    this.modalTitle = 'Cập nhật hình ảnh';
    this.currentId = item._id;
    this.formData = { ...item };
    this.isModalOpen = true;
  }

  handleSave(data: any) {
    this.isSaving = true;

    if (this.currentId) {
      // Update
      this.pictureService.updatePicture(this.currentId, data).subscribe({
        next: () => {
          this.isSaving = false;
          this.isModalOpen = false;
          this.loadPictures();
          alert('Cập nhật thành công!');
        },
        error: (err) => {
          this.isSaving = false;
          alert('Lỗi: ' + err.error.message);
        },
      });
    } else {
      // Create
      this.pictureService.createPicture(data).subscribe({
        next: () => {
          this.isSaving = false;
          this.isModalOpen = false;
          this.loadPictures();
          alert('Thêm mới thành công!');
        },
        error: (err) => {
          this.isSaving = false;
          alert('Lỗi: ' + err.error.message);
        },
      });
    }
  }

  // Xóa hình
  deleteItem(id: string) {
    if (confirm('Bạn có chắc chắn muốn xóa?')) {
      this.pictureService.deletePicture(id).subscribe(() => {
        this.loadPictures();
      });
    }
  }

  getImageUrl(path: string): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `http://localhost:8000${path}`;
  }
  // Method để đếm số danh mục unique
  getUniqueCategories(): number {
    const categories = this.pictures.map((item) => item.category);
    return new Set(categories).size;
  }

  // Method để lấy ngày hiện tại
  getCurrentDate(): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Hoặc nếu bạn muốn format theo kiểu khác:
  getCurrentDateFormatted(): string {
    return new Date().toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
