import { TestBed } from '@angular/core/testing';
import { PeriodState } from './period-state';

describe('PeriodState', () => {
  let service: PeriodState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
