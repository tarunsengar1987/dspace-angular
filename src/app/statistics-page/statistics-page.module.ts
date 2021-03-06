import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { StatisticsModule } from '../statistics/statistics.module';
import { UsageReportService } from '../core/statistics/usage-report-data.service';
import { SiteStatisticsPageComponent } from './site-statistics-page/site-statistics-page.component';
import { StatisticsTableComponent } from './statistics-table/statistics-table.component';
import { ItemStatisticsPageComponent } from './item-statistics-page/item-statistics-page.component';
import { CollectionStatisticsPageComponent } from './collection-statistics-page/collection-statistics-page.component';
import { CommunityStatisticsPageComponent } from './community-statistics-page/community-statistics-page.component';

const components = [
  StatisticsTableComponent,
  SiteStatisticsPageComponent,
  ItemStatisticsPageComponent,
  CollectionStatisticsPageComponent,
  CommunityStatisticsPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule.forRoot(),
    StatisticsModule.forRoot()
  ],
  declarations: components,
  providers: [
    UsageReportService,
  ],
  exports: components
})

/**
 * This module handles all components and pipes that are necessary for the search page
 */
export class StatisticsPageModule {
}
