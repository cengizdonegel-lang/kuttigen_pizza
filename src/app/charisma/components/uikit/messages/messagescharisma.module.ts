import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagescharismaComponent } from './messagescharisma.component';
import { MessagescharismaRoutingModule } from './messagescharisma-routing.module';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
	imports: [
		CommonModule,
		MessagescharismaRoutingModule,
		MessagesModule,
		MessageModule,
		ButtonModule,
		ToastModule,
		InputTextModule
	],
	declarations: [MessagescharismaComponent]
})
export class MessagescharismaModule { }
