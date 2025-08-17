import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TodosComponent } from './pages/todos/todos.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'todos', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'todos', component: TodosComponent, canActivate: [AuthGuard] },
];
