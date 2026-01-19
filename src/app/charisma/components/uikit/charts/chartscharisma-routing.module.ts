import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartscharismaComponent } from './chartscharisma.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ChartscharismaComponent }
	])],
	exports: [RouterModule]
})
export class ChartscharismaRoutingModule { }
