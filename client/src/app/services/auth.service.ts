import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../state/auth/auth.models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public login(email: string, password: string): Observable<{ user: User; token: string }> {
        // Simulated backend logic
        if (email === 'demo@example.com' && password === 'password') {
            const user = { id: '1', email, name: 'Demo User' };
            return of({ user, token: 'fake-jwt-token' }).pipe(delay(1000));
        }

        return throwError(() => new Error('Invalid credentials')).pipe(delay(1000));
    }
}
