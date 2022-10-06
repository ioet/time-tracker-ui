import { TestBed } from '@angular/core/testing';
import { ConnectionDirective } from './connection.directive';

describe('ConnectionDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionDirective]
      });
  });

  it('should create an instance', () => {
    const directive = new ConnectionDirective('slowSrc', 'fastSrc', 'offlineSrc', undefined);
    expect(directive).toBeTruthy();
  });
});
