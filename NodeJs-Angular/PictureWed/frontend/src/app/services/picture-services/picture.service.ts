import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getPictures(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPictureById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Hàm createFormData
  private createFormData(data: any): FormData {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('category', data.category);

    if (data.mainImage instanceof File) {
      formData.append('mainImage', data.mainImage);
    }

    // Xử lý ảnh phụ
    if (data.subImages && Array.isArray(data.subImages)) {
      data.subImages.forEach((file: any) => {
        if (file instanceof File) {
          formData.append('subImages', file);
        }
      });
    }
    return formData;
  }

  createPicture(data: any): Observable<any> {
    const formData = this.createFormData(data);
    return this.http.post(this.apiUrl, formData);
  }

  updatePicture(id: string, data: any): Observable<any> {
    const formData = this.createFormData(data);
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  deletePicture(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
