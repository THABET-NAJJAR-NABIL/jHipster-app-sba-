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
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterEntityModule {}
