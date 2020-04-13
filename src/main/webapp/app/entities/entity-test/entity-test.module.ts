import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from 'app/shared/shared.module';
import { EntityTestComponent } from './entity-test.component';
import { EntityTestDetailComponent } from './entity-test-detail.component';
import { EntityTestUpdateComponent } from './entity-test-update.component';
import { EntityTestDeleteDialogComponent } from './entity-test-delete-dialog.component';
import { entityTestRoute } from './entity-test.route';

@NgModule({
  imports: [JhipsterSharedModule, RouterModule.forChild(entityTestRoute)],
  declarations: [EntityTestComponent, EntityTestDetailComponent, EntityTestUpdateComponent, EntityTestDeleteDialogComponent],
  entryComponents: [EntityTestDeleteDialogComponent]
})
export class JhipsterEntityTestModule {}
