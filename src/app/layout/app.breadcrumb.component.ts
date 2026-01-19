import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import {UserAuthService} from "../charisma/service/user-auth.service";


interface Breadcrumb {
    label: string;
    url?: string;
}

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './app.breadcrumb.component.html'
})
export class AppBreadcrumbComponent {

    // private readonly _breadcrumbsAdmin$ = new BehaviorSubject<Breadcrumb[]>([]);
    // readonly breadcrumbsAdmin$ = this._breadcrumbsAdmin$.asObservable();
    private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
    readonly breadcrumbs$ = this._breadcrumbs$.asObservable();


//TODO breadcrumb
    constructor(private router: Router,  private userAuthService: UserAuthService) {
            this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(event => {
                const root = this.router.routerState.snapshot.root;
                const breadcrumbs: Breadcrumb[] = [];
                this.addBreadcrumb(root, [], breadcrumbs);

                this._breadcrumbs$.next(breadcrumbs);
            });



    }

    private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: Breadcrumb[]) {
        const routeUrl = parentUrl.concat(route.url.map(url => url.path));
        const breadcrumb = route.data['breadcrumb'];
        const parentBreadcrumb = route.parent && route.parent.data ? route.parent.data['breadcrumb'] : null;
        if (breadcrumb && breadcrumb !== parentBreadcrumb) {
            breadcrumbs.push({
                label: route.data['breadcrumb'],
                url: '/' + routeUrl.join('/')
            });
        }

        if (route.firstChild) {
            this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
        }
    }
    private addBreadcrumbAdmin(route: ActivatedRouteSnapshot, parentUrl1: string[], breadcrumbsAdmin: Breadcrumb[]) {
            const routeUrl = parentUrl1.concat(route.url.map(url => url.path));
            const breadcrumbAdmin = route.data['breadcrumb'];
            const parentBreadcrumb = route.parent && route.parent.data ? route.parent.data['breadcrumbAdmin'] : null;
            if (breadcrumbAdmin && breadcrumbAdmin !== parentBreadcrumb) {
                breadcrumbsAdmin.push({
                    label: route.data['breadcrumbAdmin'],
                    url: '/' + routeUrl.join('/')
                });
            }

            if (route.firstChild) {
                this.addBreadcrumbAdmin(route.firstChild, routeUrl, breadcrumbsAdmin);
            }
        }

}
