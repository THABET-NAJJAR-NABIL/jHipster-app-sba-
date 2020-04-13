import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from 'app/shared/shared.module';
import { Book1Component } from './book-1.component';
import { Book1DetailComponent } from './book-1-detail.component';
import { Book1UpdateComponent } from './book-1-update.component';
import { Book1DeleteDialogComponent } from './book-1-delete-dialog.component';
import { book1Route } from './book-1.route';

@NgModule({
  imports: [JhipsterSharedModule, RouterModule.forChild(book1Route)],
  declarations: [Book1Component, Book1DetailComponent, Book1UpdateComponent, Book1DeleteDialogComponent],
  entryComponents: [Book1DeleteDialogComponent]
})
export class JhipsterBook1Module {}
