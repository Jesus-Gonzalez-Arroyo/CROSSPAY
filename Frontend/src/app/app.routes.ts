import { Routes } from '@angular/router';
import { Login } from './pages/login/login'
import { Form } from './pages/form/form'
import { PanelAdmin } from './pages/panel-admin/panel-admin'
import { MainLayout } from './components/layouts/main-layout/main-layout';
import { AuthGuard } from './core/guards/auth/auth-roles-guard';


export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            { path: '', component: Form },
            { path: 'login', component: Login },
            { path: 'panel/administracion', component: PanelAdmin, canActivate: [AuthGuard] },
        ],
    }
];
