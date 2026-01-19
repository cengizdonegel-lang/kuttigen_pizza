import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmptycharismaComponent } from './emptycharisma.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EmptycharismaComponent }
	])],
	exports: [RouterModule]
})
export class EmptycharismaRoutingModule { }
