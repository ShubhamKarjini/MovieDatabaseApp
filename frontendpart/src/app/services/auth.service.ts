import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenSubject: BehaviorSubject<string | null>;
  private userSubject: BehaviorSubject<User | null>;

  public token$: Observable<string | null>;
  public user$: Observable<User | null>;

  constructor(private http: HttpClient) {
    // Initialize in constructor, not in property declaration
    const initialToken = this.getTokenFromStorage();
    const initialUser = this.getUserFromStorage();
    
    this.tokenSubject = new BehaviorSubject<string | null>(initialToken);
    this.userSubject = new BehaviorSubject<User | null>(initialUser);
    
    this.token$ = this.tokenSubject.asObservable();
    this.user$ = this.userSubject.asObservable();
  }

  private getTokenFromStorage(): string | null {
    return localStorage.getItem('token');
  }

  private getUserFromStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, email, password });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        this.setToken(response.token);
        this.setUser(response.user);
        this.tokenSubject.next(response.token);
        this.userSubject.next(response.user);
      })
    );
  }

  logout(): void {
    this.removeToken();
    this.removeUser();
    this.tokenSubject.next(null);
    this.userSubject.next(null);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('getToken called, returning:', token ? 'token exists' : 'no token');
    return token;
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  removeUser(): void {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const result = !!token;
    console.log('isLoggedIn check - token exists:', !!token, 'result:', result);
    return result;
  }
}