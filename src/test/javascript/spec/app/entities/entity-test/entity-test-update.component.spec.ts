import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { EntityTestUpdateComponent } from 'app/entities/entity-test/entity-test-update.component';
import { EntityTestService } from 'app/entities/entity-test/entity-test.service';
import { EntityTest } from 'app/shared/model/entity-test.model';

describe('Component Tests', () => {
  describe('EntityTest Management Update Component', () => {
    let comp: EntityTestUpdateComponent;
    let fixture: ComponentFixture<EntityTestUpdateComponent>;
    let service: EntityTestService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestModule],
        declarations: [EntityTestUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EntityTestUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EntityTestUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntityTestService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EntityTest(123);
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
        const entity = new EntityTest();
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
