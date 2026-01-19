import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TimelinecharismaComponent } from './timelinecharisma.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TimelinecharismaComponent }
    ])],
    exports: [RouterModule]
})
export class TimelinecharismaRoutingModule { }
