import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TreecharismaComponent } from './treecharisma.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: TreecharismaComponent }
	])],
	exports: [RouterModule]
})
export class TreecharismaRoutingModule { }
