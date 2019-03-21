import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../model/user';
import {Observable} from 'rxjs';
import {ApiResponse} from '../model/api-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:8090/users/';

  constructor(private http: HttpClient) {
  }

  login(loginPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('http://localhost:8090/' + 'token/generate-token', loginPayload);
  }

  getUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + id);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + user.id, user);
  }

  deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }

  // getEntities(url: string): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(url);
  // }

  getEntities(url: string, search = '', sort = 'id', sortDirection = 'desc', page = 0, size = 20): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(url, {
      params: new HttpParams()
        .set('search', search)
        .set('sort', sort + ',' + sortDirection)
        .set('page', page.toString())
        .set('size', size.toString())
    });
  }

  getEntityById(url: string, id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(url + id);
  }

  createEntity(url: string, entity): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(url, entity);
  }

  updateEntity(url: string, entity): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(url, entity);
  }

  deleteEntity(url: string, entity): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(url + entity.id);
  }
}
