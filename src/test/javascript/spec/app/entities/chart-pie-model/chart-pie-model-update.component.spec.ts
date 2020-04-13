import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { ChartPieModelUpdateComponent } from 'app/entities/chart-pie-model/chart-pie-model-update.component';
import { ChartPieModelService } from 'app/entities/chart-pie-model/chart-pie-model.service';
import { ChartPieModel } from 'app/shared/model/chart-pie-model.model';

describe('Component Tests', () => {
  describe('ChartPieModel Management Update Component', () => {
    let comp: ChartPieModelUpdateComponent;
    let fixture: ComponentFixture<ChartPieModelUpdateComponent>;
    let service: ChartPieModelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestModule],
        declarations: [ChartPieModelUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ChartPieModelUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChartPieModelUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChartPieModelService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ChartPieModel(123);
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
        const entity = new ChartPieModel();
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
