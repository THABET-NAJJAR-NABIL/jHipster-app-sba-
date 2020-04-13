import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { Book1Component } from 'app/entities/book-1/book-1.component';
import { Book1Service } from 'app/entities/book-1/book-1.service';
import { Book1 } from 'app/shared/model/book-1.model';

describe('Component Tests', () => {
  describe('Book1 Management Component', () => {
    let comp: Book1Component;
    let fixture: ComponentFixture<Book1Component>;
    let service: Book1Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestModule],
        declarations: [Book1Component]
      })
        .overrideTemplate(Book1Component, '')
        .compileComponents();

      fixture = TestBed.createComponent(Book1Component);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Book1Service);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Book1(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.book1S && comp.book1S[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
