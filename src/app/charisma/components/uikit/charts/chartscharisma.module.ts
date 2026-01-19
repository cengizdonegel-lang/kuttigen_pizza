import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartscharismaRoutingModule } from './chartscharisma-routing.module';
import { ChartModule } from 'primeng/chart'
import { ChartscharismaComponent } from './chartscharisma.component';

@NgModule({
	imports: [
		CommonModule,
		ChartscharismaRoutingModule,
		ChartModule
	],
	declarations: [ChartscharismaComponent]
})
export class ChartscharismaModule { }
