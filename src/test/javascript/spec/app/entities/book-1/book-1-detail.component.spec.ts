import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { Book1DetailComponent } from 'app/entities/book-1/book-1-detail.component';
import { Book1 } from 'app/shared/model/book-1.model';

describe('Component Tests', () => {
  describe('Book1 Management Detail Component', () => {
    let comp: Book1DetailComponent;
    let fixture: ComponentFixture<Book1DetailComponent>;
    const route = ({ data: of({ book1: new Book1(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestModule],
        declarations: [Book1DetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(Book1DetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Book1DetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load book1 on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.book1).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
