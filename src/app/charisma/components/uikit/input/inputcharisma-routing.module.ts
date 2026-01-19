import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputcharismaComponent } from './inputcharisma.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InputcharismaComponent }
	])],
	exports: [RouterModule]
})
export class InputcharismaRoutingModule { }
