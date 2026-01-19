import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtoncharismaComponent } from './buttoncharisma.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ButtoncharismaComponent }
	])],
	exports: [RouterModule]
})
export class ButtoncharismaRoutingModule { }
