import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideStore } from '@ngrx/store';
import { AuthState } from '../state/auth/auth.models';
import { authReducer } from '../state/auth/auth.reducer';
import * as AuthActions from '../state/auth/auth.actions';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let store: Store<{ auth: AuthState }>;
    let dispatchSpy: jasmine.Spy;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoginComponent],
            providers: [provideStore({ auth: authReducer })]
        }).compileComponents();

        store = TestBed.inject(Store);
        dispatchSpy = spyOn(store, 'dispatch');

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialise the login form with empty values', () => {
        const loginForm = component.loginForm;

        expect(loginForm).toBeDefined();
        expect(loginForm.controls['email'].value).toBe('');
        expect(loginForm.controls['password'].value).toBe('');
    });

    it('should mark form as invalid when empty', () => {
        expect(component.loginForm.valid).toBeFalse();
    });

    it('should disable submit button when form is invalid', () => {
        const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

        expect(button.disabled).toBeTrue();
    });

    it('should show validation errors after submit with empty form', () => {
        component.onSubmit();
        fixture.detectChanges();

        const emailError = fixture.debugElement.query(By.css('.text-danger'));

        expect(emailError).toBeTruthy();
    });

    it('should show an email is required error when email field is empty and touched', () => {
        const emailControl = component.loginForm.controls['email'];
        emailControl.markAsTouched();
        emailControl.setValue('');
        fixture.detectChanges();
        const emailError = fixture.debugElement.query(By.css('.text-danger'));

        expect(emailError.nativeElement.textContent).toContain('Email is required');
    });

    it('should show an enter valid email error when email field is not a valid email and touched', () => {
        const emailControl = component.loginForm.controls['email'];
        emailControl.markAsTouched();
        emailControl.setValue('abcd');
        fixture.detectChanges();
        const emailError = fixture.debugElement.query(By.css('.text-danger'));

        expect(emailError.nativeElement.textContent).toContain('Please enter a valid email address.');
    });

    it('should show a password required error when password field is empty and touched', () => {
        const emailControl = component.loginForm.controls['password'];
        emailControl.markAsTouched();
        emailControl.setValue('');
        fixture.detectChanges();
        const emailError = fixture.debugElement.query(By.css('.text-danger'));

        expect(emailError.nativeElement.textContent).toContain('Password is required.');
    });

    it('should dispatch login action when form is valid', () => {
        component.loginForm.setValue({ email: 'test@example.com', password: 'secret123' });

        component.onSubmit();

        expect(dispatchSpy).toHaveBeenCalledWith(
            AuthActions.login({ email: 'test@example.com', password: 'secret123' })
        );
    });

    it('should not dispatch login action if form is invalid', () => {
        component.loginForm.setValue({ email: '', password: '' });

        component.onSubmit();

        expect(dispatchSpy).not.toHaveBeenCalled();
    });
});
