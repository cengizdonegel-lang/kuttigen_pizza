import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListcharismaComponent } from './listcharisma.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ListcharismaComponent }
	])],
	exports: [RouterModule]
})
export class ListcharismaRoutingModule { }
