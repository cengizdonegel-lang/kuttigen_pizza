import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'button', data: { breadcrumb: 'Button' }, loadChildren: () => import('./button/buttoncharisma.module').then(m => m.ButtoncharismaModule) },
        { path: 'charts', data: { breadcrumb: 'Charts' }, loadChildren: () => import('./charts/chartscharisma.module').then(m => m.ChartscharismaModule) },
        { path: 'file', data: { breadcrumb: 'File' }, loadChildren: () => import('./file/filecharisma.module').then(m => m.FilecharismaModule) },
        { path: 'floatlabel', data: { breadcrumb: 'Float Label' }, loadChildren: () => import('./floatlabel/floatlabelcharisma.module').then(m => m.FloatlabelcharismaModule) },
        { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./formlayout/formlayoutcharisma.module').then(m => m.FormLayoutcharismaModule) },
        { path: 'input', data: { breadcrumb: 'Input' }, loadChildren: () => import('./input/inputcharisma.module').then(m => m.InputcharismaModule) },
        { path: 'invalidstate', data: { breadcrumb: 'Invalid State' }, loadChildren: () => import('./invalid/invalidstatecharisma.module').then(m => m.InvalidStatecharismaModule) },
        { path: 'list', data: { breadcrumb: 'List' }, loadChildren: () => import('./list/listcharisma.module').then(m => m.ListcharismaModule) },
        { path: 'media', data: { breadcrumb: 'Media' }, loadChildren: () => import('./media/mediacharisma.module').then(m => m.MediacharismaModule) },
        { path: 'message', data: { breadcrumb: 'Message' }, loadChildren: () => import('./messages/messagescharisma.module').then(m => m.MessagescharismaModule) },
        { path: 'misc', data: { breadcrumb: 'Misc' }, loadChildren: () => import('./misc/misccharisma.module').then(m => m.MisccharismaModule) },
        { path: 'overlay', data: { breadcrumb: 'Overlay' }, loadChildren: () => import('./overlays/overlayscharisma.module').then(m => m.OverlayscharismaModule) },
        { path: 'panel', data: { breadcrumb: 'Panel' }, loadChildren: () => import('./panels/panelscharisma.module').then(m => m.PanelscharismaModule) },
        { path: 'table', data: { breadcrumb: 'Table' }, loadChildren: () => import('./table/tablecharisma.module').then(m => m.TablecharismaModule) },
        { path: 'tree', data: { breadcrumb: 'Tree' }, loadChildren: () => import('./tree/treecharisma.module').then(m => m.TreecharismaModule) },
        { path: 'menu', data: { breadcrumb: 'Menu' }, loadChildren: () => import('./menus/menus.module').then(m => m.MenusModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }
