import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListRoutingModule } from './productlist-routing.module';
import { ProductListComponent } from './productlist.component';
import { RippleModule } from 'primeng/ripple';
import {TooltipModule} from "primeng/tooltip";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {CarouselModule} from "primeng/carousel";

@NgModule({
    imports: [
        CommonModule,
        ProductListRoutingModule,
        RippleModule,
        TooltipModule,
        CardModule,
        ButtonModule,
        CarouselModule
    ],
    declarations: [ProductListComponent]
})
export class ProductListModule { }
