import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from 'app/shared/shared.module';
import { PieModelComponent } from './pie-model.component';
import { PieModelDetailComponent } from './pie-model-detail.component';
import { PieModelUpdateComponent } from './pie-model-update.component';
import { PieModelDeleteDialogComponent } from './pie-model-delete-dialog.component';
import { pieModelRoute } from './pie-model.route';

@NgModule({
  imports: [JhipsterSharedModule, RouterModule.forChild(pieModelRoute)],
  declarations: [PieModelComponent, PieModelDetailComponent, PieModelUpdateComponent, PieModelDeleteDialogComponent],
  entryComponents: [PieModelDeleteDialogComponent]
})
export class JhipsterPieModelModule {}
