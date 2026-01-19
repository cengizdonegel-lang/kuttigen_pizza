import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./charisma/components/dashboards/dashboards.module').then(m => m.DashboardsModule) },
            // canActivate: [AuthGuard], data: { roles: ["Admin"] }
            { path: 'uikit', data: { breadcrumb: 'UI Kit' }, loadChildren: () => import('./charisma/components/uikit/uikit.module').then(m => m.UIkitModule) },

            { path: 'utilities', data: { breadcrumb: 'Utilities' }, loadChildren: () => import('./charisma/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
            { path: 'pages', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./charisma/components/pages/pages.module').then(m => m.PagesModule) },
            { path: 'profile', data: { breadcrumb: 'User Management' }, loadChildren: () => import('./charisma/components/profile/profile.module').then(m => m.ProfileModule) },
            { path: 'documentation', data: { breadcrumb: 'Documentation' }, loadChildren: () => import('./charisma/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'blocks', data: { breadcrumb: 'Prime Blocks' }, loadChildren: () => import('./charisma/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
            { path: 'ecommerce', data: { breadcrumb: 'E-Commerce' }, loadChildren: () => import('./charisma/components/ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
            { path: 'apps', data: { breadcrumbAdmin: 'Apps' }, loadChildren: () => import('./charisma/components/apps/apps.module').then(m => m.AppsModule) },
        ]
    },
    { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./charisma/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'notfound', loadChildren: () => import('./charisma/components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: 'notfound2', loadChildren: () => import('./charisma/components/notfound2/notfound2.module').then(m => m.Notfound2Module) },
    { path: 'landing', loadChildren: () => import('./charisma/components/landing/landing.module').then(m => m.LandingModule) },
    // { path: '**', redirectTo: './charisma/components/dashboards/dashboards.module',pathMatch :"full"},

    { path: '**', redirectTo: '/auth/login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
