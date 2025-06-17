import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        children: [
            // dashboard, calendar, etc. will go here later
        ]
    }
];
