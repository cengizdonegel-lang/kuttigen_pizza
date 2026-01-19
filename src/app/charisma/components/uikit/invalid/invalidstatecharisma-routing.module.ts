import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvalidStatecharismaComponent } from './invalidstatecharisma.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InvalidStatecharismaComponent }
	])],
	exports: [RouterModule]
})
export class InvalidStatecharismaRoutingModule { }
