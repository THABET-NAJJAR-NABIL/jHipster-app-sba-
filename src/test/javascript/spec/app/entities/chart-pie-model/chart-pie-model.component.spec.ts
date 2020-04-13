import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { ChartPieModelComponent } from 'app/entities/chart-pie-model/chart-pie-model.component';
import { ChartPieModelService } from 'app/entities/chart-pie-model/chart-pie-model.service';
import { ChartPieModel } from 'app/shared/model/chart-pie-model.model';

describe('Component Tests', () => {
  describe('ChartPieModel Management Component', () => {
    let comp: ChartPieModelComponent;
    let fixture: ComponentFixture<ChartPieModelComponent>;
    let service: ChartPieModelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestModule],
        declarations: [ChartPieModelComponent]
      })
        .overrideTemplate(ChartPieModelComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChartPieModelComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChartPieModelService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ChartPieModel(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.chartPieModels && comp.chartPieModels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
