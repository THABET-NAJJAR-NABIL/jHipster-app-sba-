import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { ChartPieModelDetailComponent } from 'app/entities/chart-pie-model/chart-pie-model-detail.component';
import { ChartPieModel } from 'app/shared/model/chart-pie-model.model';

describe('Component Tests', () => {
  describe('ChartPieModel Management Detail Component', () => {
    let comp: ChartPieModelDetailComponent;
    let fixture: ComponentFixture<ChartPieModelDetailComponent>;
    const route = ({ data: of({ chartPieModel: new ChartPieModel(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestModule],
        declarations: [ChartPieModelDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ChartPieModelDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChartPieModelDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load chartPieModel on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.chartPieModel).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
