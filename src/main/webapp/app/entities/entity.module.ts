import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then(m => m.JhipsterBlogModule)
      },
      {
        path: 'entry',
        loadChildren: () => import('./entry/entry.module').then(m => m.JhipsterEntryModule)
      },
      {
        path: 'tag',
        loadChildren: () => import('./tag/tag.module').then(m => m.JhipsterTagModule)
      },
      {
        path: 'book',
        loadChildren: () => import('./book/book.module').then(m => m.JhipsterBookModule)
      },
      {
        path: 'entity-test',
        loadChildren: () => import('./entity-test/entity-test.module').then(m => m.JhipsterEntityTestModule)
      },
      {
        path: 'pie-model',
        loadChildren: () => import('./pie-model/pie-model.module').then(m => m.JhipsterPieModelModule)
      },
      {
        path: 'chart-pie-model',
        loadChildren: () => import('./chart-pie-model/chart-pie-model.module').then(m => m.JhipsterChartPieModelModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterEntityModule {}
