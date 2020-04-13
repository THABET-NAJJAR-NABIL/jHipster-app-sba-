import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { EntityTestDetailComponent } from 'app/entities/entity-test/entity-test-detail.component';
import { EntityTest } from 'app/shared/model/entity-test.model';

describe('Component Tests', () => {
  describe('EntityTest Management Detail Component', () => {
    let comp: EntityTestDetailComponent;
    let fixture: ComponentFixture<EntityTestDetailComponent>;
    const route = ({ data: of({ entityTest: new EntityTest(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestModule],
        declarations: [EntityTestDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EntityTestDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EntityTestDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load entityTest on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.entityTest).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
