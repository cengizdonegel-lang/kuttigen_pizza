import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MisccharismaComponent } from './misccharisma.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MisccharismaComponent }
	])],
	exports: [RouterModule]
})
export class MisccharismaRoutingModule { }
