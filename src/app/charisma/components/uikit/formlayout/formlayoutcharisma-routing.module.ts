import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormLayoutcharismaComponent } from './formlayoutcharisma.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: FormLayoutcharismaComponent }
	])],
	exports: [RouterModule]
})
export class FormLayoutcharismaRoutingModule { }
