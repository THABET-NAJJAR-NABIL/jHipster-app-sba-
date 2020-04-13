import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { JhipsterSharedModule } from 'app/shared/shared.module';
import { JhipsterCoreModule } from 'app/core/core.module';
import { JhipsterAppRoutingModule } from './app-routing.module';
import { JhipsterHomeModule } from './home/home.module';
import { JhipsterEntityModule } from './entities/entity.module';
import { ChartsModule } from 'ng2-charts';

// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { ChartTestComponent } from './chart-test/chart-test.component';

@NgModule({
  imports: [
    BrowserModule,
    JhipsterSharedModule,
    JhipsterCoreModule,
    JhipsterHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    JhipsterEntityModule,
    JhipsterAppRoutingModule,
    ChartsModule
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    ChartTestComponent
  ],
  bootstrap: [MainComponent]
})
export class JhipsterAppModule {}
