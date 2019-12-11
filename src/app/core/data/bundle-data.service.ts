import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { hasValue } from '../../shared/empty.util';
import { NotificationsService } from '../../shared/notifications/notifications.service';
import { NormalizedObjectBuildService } from '../cache/builders/normalized-object-build.service';
import { RemoteDataBuildService } from '../cache/builders/remote-data-build.service';
import { ObjectCacheService } from '../cache/object-cache.service';
import { CoreState } from '../core.reducers';
import { Bundle } from '../shared/bundle.model';
import { HALEndpointService } from '../shared/hal-endpoint.service';
import { Item } from '../shared/item.model';
import { BitstreamDataService } from './bitstream-data.service';
import { DataService } from './data.service';
import { DefaultChangeAnalyzer } from './default-change-analyzer.service';
import { PaginatedList } from './paginated-list';
import { RemoteData } from './remote-data';
import { FindListOptions } from './request.models';
import { RequestService } from './request.service';

/**
 * A service responsible for fetching/sending data from/to the REST API on the bundles endpoint
 */
@Injectable(
  {providedIn: 'root'}
)
export class BundleDataService extends DataService<Bundle> {
  protected linkPath = 'bundles';
  protected forceBypassCache = false;

  constructor(
    protected requestService: RequestService,
    protected rdbService: RemoteDataBuildService,
    protected dataBuildService: NormalizedObjectBuildService,
    protected store: Store<CoreState>,
    protected objectCache: ObjectCacheService,
    protected halService: HALEndpointService,
    protected notificationsService: NotificationsService,
    protected http: HttpClient,
    protected comparator: DefaultChangeAnalyzer<Bundle>) {
    super();
  }

  /**
   * Get the endpoint for browsing bundles
   * @param {FindListOptions} options
   * @returns {Observable<string>}
   */
  getBrowseEndpoint(options: FindListOptions = {}, linkPath?: string): Observable<string> {
    return this.halService.getEndpoint(this.linkPath);
  }

  findAllByItem(item: Item, options?: FindListOptions): Observable<RemoteData<PaginatedList<Bundle>>> {
    return this.findAllByHref(item._links.bundles.href, options);
  }

  // TODO should be implemented rest side
  findByItemAndName(item: Item, bundleName: string): Observable<RemoteData<Bundle>> {
    return this.findAllByItem(item, { elementsPerPage: Number.MAX_SAFE_INTEGER }).pipe(
      map((rd: RemoteData<PaginatedList<Bundle>>) => {
        if (hasValue(rd.payload) && hasValue(rd.payload.page)) {
          const matchingBundle = rd.payload.page.find((bundle: Bundle) =>
            bundle.name === bundleName);
          return new RemoteData(
            false,
            false,
            true,
            undefined,
            matchingBundle
          );
        } else {
          return rd as any;
        }
      }),
    );
  }
}
