import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { EntityTestComponent } from 'app/entities/entity-test/entity-test.component';
import { EntityTestService } from 'app/entities/entity-test/entity-test.service';
import { EntityTest } from 'app/shared/model/entity-test.model';

describe('Component Tests', () => {
  describe('EntityTest Management Component', () => {
    let comp: EntityTestComponent;
    let fixture: ComponentFixture<EntityTestComponent>;
    let service: EntityTestService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestModule],
        declarations: [EntityTestComponent]
      })
        .overrideTemplate(EntityTestComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EntityTestComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntityTestService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EntityTest(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.entityTests && comp.entityTests[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
