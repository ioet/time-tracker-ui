import { TestBed } from '@angular/core/testing';
import { OfflineDirective } from './offline.directive';

describe('FastDirective', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [OfflineDirective]
        });
    });
    it('should create an instance', () => {
    const directive = new OfflineDirective(undefined);
    expect(directive).toBeTruthy();
    });
});
