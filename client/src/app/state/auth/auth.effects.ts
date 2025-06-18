import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
                        map((res) =>
                            AuthActions.loginSuccess({
                                user: res.user,
                                token: res.token
                            })
                        ),
                        catchError((err) => of(AuthActions.loginFailure({ error: err.message })))
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
