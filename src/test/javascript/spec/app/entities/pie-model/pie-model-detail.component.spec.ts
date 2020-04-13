import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { PieModelDetailComponent } from 'app/entities/pie-model/pie-model-detail.component';
import { PieModel } from 'app/shared/model/pie-model.model';

describe('Component Tests', () => {
  describe('PieModel Management Detail Component', () => {
    let comp: PieModelDetailComponent;
    let fixture: ComponentFixture<PieModelDetailComponent>;
    const route = ({ data: of({ pieModel: new PieModel(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestModule],
        declarations: [PieModelDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PieModelDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PieModelDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pieModel on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pieModel).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
