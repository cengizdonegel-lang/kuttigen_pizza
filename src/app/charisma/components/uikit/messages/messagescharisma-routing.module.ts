import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessagescharismaComponent } from './messagescharisma.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MessagescharismaComponent }
	])],
	exports: [RouterModule]
})
export class MessagescharismaRoutingModule { }
