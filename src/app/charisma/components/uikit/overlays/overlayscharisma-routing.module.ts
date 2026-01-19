import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayscharismaComponent } from './overlayscharisma.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: OverlayscharismaComponent }
	])],
	exports: [RouterModule]
})
export class OverlayscharismaRoutingModule { }
