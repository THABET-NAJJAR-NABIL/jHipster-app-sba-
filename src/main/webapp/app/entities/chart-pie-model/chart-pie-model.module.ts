import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from 'app/shared/shared.module';
import { ChartPieModelComponent } from './chart-pie-model.component';
import { ChartPieModelDetailComponent } from './chart-pie-model-detail.component';
import { ChartPieModelUpdateComponent } from './chart-pie-model-update.component';
import { ChartPieModelDeleteDialogComponent } from './chart-pie-model-delete-dialog.component';
import { chartPieModelRoute } from './chart-pie-model.route';

@NgModule({
  imports: [JhipsterSharedModule, RouterModule.forChild(chartPieModelRoute)],
  declarations: [ChartPieModelComponent, ChartPieModelDetailComponent, ChartPieModelUpdateComponent, ChartPieModelDeleteDialogComponent],
  entryComponents: [ChartPieModelDeleteDialogComponent]
})
export class JhipsterChartPieModelModule {}
