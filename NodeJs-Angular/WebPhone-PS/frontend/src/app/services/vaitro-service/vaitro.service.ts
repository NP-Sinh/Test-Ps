import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VaitroService {
  private apiUrl = `${environment.apiUrl}/vaitro`;

  constructor(private http: HttpClient) {}

  getVaiTro(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  getVaiTroById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getVaiTroById/${id}`);
  }

  modifyVaiTro(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/modify`, data);
  }

  deleteVaiTro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  restoreVaiTro(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/restore/${id}`, {});
  }
}
