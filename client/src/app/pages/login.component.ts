import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthState } from '../state/auth/auth.models';
import * as AuthActions from '../state/auth/auth.actions';
import { selectAuthError, selectAuthLoading } from '../state/auth/auth.selectors';

@Component({
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    public loginForm: FormGroup;
    public loading$!: Observable<boolean>;
    public error$!: Observable<string | null>;

    constructor(
        private fb: FormBuilder,
        private store: Store<{ auth: AuthState }>
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.loading$ = this.store.select(selectAuthLoading);
        this.error$ = this.store.select(selectAuthError);
    }

    public onSubmit(): void {
        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;
            this.store.dispatch(AuthActions.login({ email, password }));
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
