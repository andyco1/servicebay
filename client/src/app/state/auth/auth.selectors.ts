import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.models';

// select the feature slice
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// individual selectors
export const selectAuthLoading = createSelector(selectAuthState, (state) => state.loading);

export const selectAuthError = createSelector(selectAuthState, (state) => state.error);

export const selectAuthUser = createSelector(selectAuthState, (state) => state.user);

export const selectAuthToken = createSelector(selectAuthState, (state) => state.token);
