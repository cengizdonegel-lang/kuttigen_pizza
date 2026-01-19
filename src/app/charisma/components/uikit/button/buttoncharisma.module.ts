import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtoncharismaRoutingModule } from './buttoncharisma-routing.module';
import { ButtoncharismaComponent } from './buttoncharisma.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';

@NgModule({
	imports: [
		CommonModule,
		ButtoncharismaRoutingModule,
		ButtonModule,
		RippleModule,
		SplitButtonModule,
		ToggleButtonModule,
	],
	declarations: [ButtoncharismaComponent]
})
export class ButtoncharismaModule { }
