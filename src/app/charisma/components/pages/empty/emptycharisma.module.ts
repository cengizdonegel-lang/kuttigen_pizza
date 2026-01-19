import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptycharismaRoutingModule } from './emptycharisma-routing.module';
import { EmptycharismaComponent } from './emptycharisma.component';

@NgModule({
	imports: [
		CommonModule,
		EmptycharismaRoutingModule
	],
	declarations: [EmptycharismaComponent]
})
export class EmptycharismaModule { }
