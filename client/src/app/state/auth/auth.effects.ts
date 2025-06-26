import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {
    public login$;
    public loginRedirect$;

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {
        this.login$ = createEffect(() =>
            this.actions$.pipe(
                ofType(AuthActions.login),
                switchMap(({ email, password }) =>
                    this.authService.login(email, password).pipe(
                        map((res) => AuthActions.loginSuccess({ user: res.user, token: res.token })),
                        catchError((err) => {
                            let errorMessage = 'An unexpected error occurred. Please try again.';
                            if (err.status === 401) {
                                errorMessage = 'Invalid email or password.';
                            } else if (err.status === 0) {
                                errorMessage = 'Unable to connect to the server.';
                            }
                            return of(AuthActions.loginFailure({ error: errorMessage }));
                        })
                    )
                )
            )
        );

        this.loginRedirect$ = createEffect(
            () =>
                this.actions$.pipe(
                    ofType(AuthActions.loginSuccess),
                    map(() => {
                        void this.router.navigate(['/dashboard']);
                    })
                ),
            { dispatch: false }
        );
    }
}
