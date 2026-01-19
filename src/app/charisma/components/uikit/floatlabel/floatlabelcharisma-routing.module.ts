import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FloatLabelcharismaComponent } from './floatlabelcharisma.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: FloatLabelcharismaComponent }
	])],
	exports: [RouterModule]
})
export class FloatlabelcharismaRoutingModule { }
