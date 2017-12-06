import { Inject, Injectable } from '@angular/core';

import { EpersonService } from './eperson.service';
import { ResponseCacheService } from '../cache/response-cache.service';
import { RequestService } from '../data/request.service';
import { GLOBAL_CONFIG } from '../../../config';
import { GlobalConfig } from '../../../config/global-config.interface';

@Injectable()
export class GroupEpersonService extends EpersonService {
  protected linkName = 'groups';
  protected browseEndpoint = '';

  constructor(
    protected responseCache: ResponseCacheService,
    protected requestService: RequestService,
    @Inject(GLOBAL_CONFIG) protected EnvConfig: GlobalConfig) {
    super();
  }
}