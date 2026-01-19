import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediacharismaComponent } from './mediacharisma.component';
import { MediacharismaRoutingModule } from './mediacharisma-routing.module';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
	imports: [
		CommonModule,
		MediacharismaRoutingModule,
		ButtonModule,
		ImageModule,
		GalleriaModule,
		CarouselModule
	],
	declarations: [MediacharismaComponent]
})
export class MediacharismaModule { }
