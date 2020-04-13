import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { Book1UpdateComponent } from 'app/entities/book-1/book-1-update.component';
import { Book1Service } from 'app/entities/book-1/book-1.service';
import { Book1 } from 'app/shared/model/book-1.model';

describe('Component Tests', () => {
  describe('Book1 Management Update Component', () => {
    let comp: Book1UpdateComponent;
    let fixture: ComponentFixture<Book1UpdateComponent>;
    let service: Book1Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestModule],
        declarations: [Book1UpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(Book1UpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(Book1UpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Book1Service);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Book1(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Book1();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
