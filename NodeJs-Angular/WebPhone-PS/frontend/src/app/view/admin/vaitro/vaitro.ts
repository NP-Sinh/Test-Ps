import { Component, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Observable, catchError, map, startWith, takeUntil, of } from 'rxjs';
import { LoadingOverlay } from '../../../components/loading-overlay/loading-overlay';
import { FormField, FormModal } from '../../../components/form-modal/form-modal';
import { ToastNotification } from '../../../components/toast-notification/toast-notification';
import { VaitroService } from '../../../services/vaitro-service/vaitro.service';

interface VaiTroState {
  loading: boolean;
  data: any[] | null;
  error: string | null;
}

interface VaiTroFormData {
  id: number;
  tenvaitro: string;
  trangthai: boolean;
}

@Component({
  selector: 'app-vai-tro',
  standalone: true,
  imports: [CommonModule, LoadingOverlay, FormModal, ToastNotification],
  templateUrl: './vaitro.html',
  styleUrl: './vaitro.css',
})
export class VaiTro implements OnDestroy {
  private destroy$ = new Subject<void>();

  state$!: Observable<VaiTroState>;
  isModalOpen = false;
  modalTitle = '';
  modalFields: FormField[] = [];
  isSaving = false;
  errorMessage = '';
  isEditMode = false;

  formData: VaiTroFormData = {
    id: 0,
    tenvaitro: '',
    trangthai: true
  };

  @ViewChild(ToastNotification) toast!: ToastNotification;

  constructor(
    private vaiTroService: VaitroService,
  ) {}

  ngOnInit() {
    this.getVaiTro();
    this.initModalFields();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initModalFields() {
    this.modalFields = [
      {
        key: 'id',
        label: 'ID',
        type: 'number',
        disabled: true,
      },
      {
        key: 'tenvaitro',
        label: 'Tên vai trò',
        type: 'text',
        required: true,
        placeholder: 'Nhập tên vai trò',
      }
    ];
  }

  closeModal() {
    this.isModalOpen = false;
    this.formData = {
      id: 0,
      tenvaitro: '',
      trangthai: true
    };
    this.errorMessage = '';
    this.isSaving = false;
  }

  getVaiTro() {
    this.state$ = this.vaiTroService.getVaiTro().pipe(
      map(data => ({ loading: false, data, error: null })),
      startWith({ loading: true, data: null, error: null }),
      catchError(() => of({
        loading: false,
        data: null,
        error: 'Không tải được dữ liệu vai trò!'
      }))
    );
  }

  getVaiTroById(id: number) {
    this.vaiTroService.getVaiTroById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (vaitro) => {
          this.formData = {
            id: vaitro.id,
            tenvaitro: vaitro.tenvaitro,
            trangthai: vaitro.trangthai
          };
          this.isModalOpen = true;
        },
        error: () => {
          this.errorMessage = 'Không thể tải thông tin vai trò';
          this.toast.showToast(this.errorMessage, 'error');
        },
      });
  }

  modifyVaiTro(vaiTro: any) {
    this.isSaving = true;

    const payload = {
      id: vaiTro.id,
      tenvaitro: vaiTro.tenvaitro
    };

    this.vaiTroService.modifyVaiTro(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toast.showToast('Lưu thành công', 'success');
          this.closeModal();
          this.getVaiTro();
        },
        error: () => {
          this.errorMessage = 'Lỗi lưu dữ liệu';
          this.isSaving = false;
          this.toast.showToast(this.errorMessage, 'error');
        },
      });
  }

  deleteVaiTro(id: number) {
    if (confirm('Bạn có chắc chắn muốn vô hiệu hóa vai trò này?')) {
      this.vaiTroService.deleteVaiTro(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.toast.showToast('Vô hiệu hóa thành công', 'success');
            this.getVaiTro();
          },
          error: () => {
            this.toast.showToast('Lỗi vô hiệu hóa vai trò', 'error');
          },
        });
    }
  }

  restoreVaiTro(id: number) {
    this.vaiTroService.restoreVaiTro(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toast.showToast('Khôi phục thành công', 'success');
          this.getVaiTro();
        },
        error: () => {
          this.toast.showToast('Lỗi khôi phục vai trò', 'error');
        },
      });
  }

  addModal() {
    this.isEditMode = false;
    this.modalTitle = 'Thêm vai trò';
    this.formData = {
      id: 0,
      tenvaitro: '',
      trangthai: true
    };
    this.errorMessage = '';
    this.isModalOpen = true;
  }

  editModal(id: number) {
    this.isEditMode = true;
    this.modalTitle = 'Sửa vai trò';
    this.errorMessage = '';
    this.getVaiTroById(id);
  }

  submitForm(data: VaiTroFormData) {
    this.errorMessage = '';

    const vaiTro = {
      id: data.id,
      tenvaitro: data.tenvaitro
    };

    this.modifyVaiTro(vaiTro);
  }

  trackByVaiTro(index: number, item: any): number {
    return item.id;
  }

  // Helper method để hiển thị trạng thái dạng text
  getTrangThaiText(trangthai: boolean): string {
    return trangthai ? 'Hoạt động' : 'Không hoạt động';
  }

  // Helper method để trả về class CSS cho trạng thái
  getTrangThaiClass(trangthai: boolean): string {
    return trangthai ? 'badge bg-success' : 'badge bg-secondary';
  }
}
