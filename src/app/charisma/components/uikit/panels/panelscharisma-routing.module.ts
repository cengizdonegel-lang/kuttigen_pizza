import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanelscharismaComponent } from './panelscharisma.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PanelscharismaComponent }
	])],
	exports: [RouterModule]
})
export class PanelscharismaRoutingModule { }
