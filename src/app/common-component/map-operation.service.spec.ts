import { TestBed } from '@angular/core/testing';

import { MapOperationService } from './map-operation.service';

describe('MapOperationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapOperationService = TestBed.get(MapOperationService);
    expect(service).toBeTruthy();
  });
});
