import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { PieModelUpdateComponent } from 'app/entities/pie-model/pie-model-update.component';
import { PieModelService } from 'app/entities/pie-model/pie-model.service';
import { PieModel } from 'app/shared/model/pie-model.model';

describe('Component Tests', () => {
  describe('PieModel Management Update Component', () => {
    let comp: PieModelUpdateComponent;
    let fixture: ComponentFixture<PieModelUpdateComponent>;
    let service: PieModelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestModule],
        declarations: [PieModelUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PieModelUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PieModelUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PieModelService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PieModel(123);
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
        const entity = new PieModel();
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
