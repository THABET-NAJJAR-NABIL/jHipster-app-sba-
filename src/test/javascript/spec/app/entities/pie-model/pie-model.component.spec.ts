import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { PieModelComponent } from 'app/entities/pie-model/pie-model.component';
import { PieModelService } from 'app/entities/pie-model/pie-model.service';
import { PieModel } from 'app/shared/model/pie-model.model';

describe('Component Tests', () => {
  describe('PieModel Management Component', () => {
    let comp: PieModelComponent;
    let fixture: ComponentFixture<PieModelComponent>;
    let service: PieModelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestModule],
        declarations: [PieModelComponent]
      })
        .overrideTemplate(PieModelComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PieModelComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PieModelService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PieModel(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pieModels && comp.pieModels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
