import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilecharismaComponent } from './filecharisma.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: FilecharismaComponent }
	])],
	exports: [RouterModule]
})
export class FilecharismaRoutingModule { }
