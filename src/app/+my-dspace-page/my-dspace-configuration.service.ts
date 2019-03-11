import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { MyDSpaceConfigurationValueType } from './my-dspace-configuration-value-type';
import { RoleService } from '../core/roles/role.service';
import { SearchConfigurationOption } from '../+search-page/search-switch-configuration/search-configuration-option.model';
import { SearchConfigurationService } from '../+search-page/search-service/search-configuration.service';
import { RouteService } from '../shared/services/route.service';
import { PaginationComponentOptions } from '../shared/pagination/pagination-component-options.model';
import { SortDirection, SortOptions } from '../core/cache/models/sort-options.model';

/**
 * Service that performs all actions that have to do with the current search configuration
 */
@Injectable()
export class MyDSpaceConfigurationService extends SearchConfigurationService {
  /**
   * Default pagination settings
   */
  protected defaultPagination = Object.assign(new PaginationComponentOptions(), {
    id: 'mydspace-page-configuration',
    pageSize: 10,
    currentPage: 1
  });

  /**
   * Default sort settings
   */
  protected defaultSort = new SortOptions('dc.date.issued', SortDirection.DESC);

  /**
   * Default configuration parameter setting
   */
  protected defaultConfiguration = 'default';

  /**
   * Default scope setting
   */
  protected defaultScope = '';

  /**
   * Default query setting
   */
  protected defaultQuery = '';

  private isAdmin$: Observable<boolean>;
  private isController$: Observable<boolean>;
  private isSubmitter$: Observable<boolean>;

  /**
   * Initialize class
   *
   * @param {roleService} roleService
   * @param {RouteService} routeService
   * @param {ActivatedRoute} route
   */
  constructor(protected roleService: RoleService,
              protected routeService: RouteService,
              protected route: ActivatedRoute) {

    super(routeService, route);
    this.isSubmitter$ = this.roleService.isSubmitter();
    this.isController$ = this.roleService.isController();
    this.isAdmin$ = this.roleService.isAdmin();
  }

  public getAvailableConfigurationTypes(): Observable<MyDSpaceConfigurationValueType[]> {
    return combineLatest(this.isSubmitter$, this.isController$, this.isAdmin$).pipe(
      first(),
      map(([isSubmitter, isController, isAdmin]: [boolean, boolean, boolean]) => {
        const availableConf: MyDSpaceConfigurationValueType[] = [];
        if (isSubmitter) {
          availableConf.push(MyDSpaceConfigurationValueType.Workspace);
        }
        if (isController || isAdmin) {
          availableConf.push(MyDSpaceConfigurationValueType.Workflow);
        }
        return availableConf;
      }));
  }

  public getAvailableConfigurationOptions(): Observable<SearchConfigurationOption[]> {
    return this.getAvailableConfigurationTypes().pipe(
      first(),
      map((availableConfigurationTypes: MyDSpaceConfigurationValueType[]) => {
        const configurationOptions: SearchConfigurationOption[] = [];
        availableConfigurationTypes.forEach((type) => {
          const value = type;
          const label = `mydspace.show.${value}`;
          configurationOptions.push({ value, label });
        });
        return configurationOptions;
      })
    )
  }

  public getCurrentView(): Observable<string> {
    return this.routeService.getQueryParameterValue('view');
  }

}