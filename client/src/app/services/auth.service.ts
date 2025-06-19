import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../state/auth/auth.models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    public login(email: string, password: string): Observable<{ user: User; token: string }> {
        return this.http.post<{ user: User; token: string }>(`${this.apiUrl}/Auth/login`, {
            email,
            password
        });
    }
}
