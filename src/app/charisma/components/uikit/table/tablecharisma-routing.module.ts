import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TablecharismaComponent } from './tablecharisma.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: TablecharismaComponent }
	])],
	exports: [RouterModule]
})
export class TablecharismaRoutingModule { }
