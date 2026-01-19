import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { FilecharismaRoutingModule } from './filecharisma-routing.module';
import { FilecharismaComponent } from './filecharisma.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		FilecharismaRoutingModule,
		FileUploadModule
	],
	declarations: [FilecharismaComponent],
})
export class FilecharismaModule { }
