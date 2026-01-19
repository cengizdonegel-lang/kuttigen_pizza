import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreecharismaComponent } from './treecharisma.component';
import { TreecharismaRoutingModule } from './treecharisma-routing.module';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';

@NgModule({
	imports: [
		CommonModule,
		TreecharismaRoutingModule,
		FormsModule,
		TreeModule,
		TreeTableModule
	],
	declarations: [TreecharismaComponent],
})
export class TreecharismaModule { }
