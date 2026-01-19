import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MediacharismaComponent } from './mediacharisma.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MediacharismaComponent }
	])],
	exports: [RouterModule]
})
export class MediacharismaRoutingModule { }
