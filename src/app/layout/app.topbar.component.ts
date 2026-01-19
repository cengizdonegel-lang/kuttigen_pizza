import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {
    
    @ViewChild('menuButton') menuButton!: ElementRef;
    
    constructor(public layoutService: LayoutService, public el: ElementRef) {}

    activeItem!: number;

    get mobileTopbarActive(): boolean {
        return this.layoutService.state.topbarMenuActive;
    }

    onMenuButtonClick() {
        if (this.layoutService.isMobile()) {
            const anyOpen = this.layoutService.state.staticMenuMobileActive || this.layoutService.state.topbarMenuActive;

            if (anyOpen) {
                // Close both (cleanup is handled by AppLayoutComponent via stateChange$).
                this.layoutService.state.staticMenuMobileActive = false;
                this.layoutService.state.overlayMenuActive = false;
                this.layoutService.state.topbarMenuActive = false;
                this.layoutService.emitStateChange();
                return;
            }

            // Open both.
            this.layoutService.onMenuToggle();
            this.layoutService.onTopbarMenuToggle();
            return;
        }

        this.layoutService.onMenuToggle();
    }

}
