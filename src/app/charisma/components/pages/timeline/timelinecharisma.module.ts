import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelinecharismaRoutingModule } from './timelinecharisma-routing.module';
import { TimelinecharismaComponent } from './timelinecharisma.component';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@NgModule({
    imports: [
        CommonModule,
        TimelineModule,
        ButtonModule,
        CardModule,
        TimelinecharismaRoutingModule
    ],
    declarations: [TimelinecharismaComponent]
})
export class TimelinecharismaModule { }
