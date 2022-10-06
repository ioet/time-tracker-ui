import { TestBed } from '@angular/core/testing';
import { SlowDirective } from './slow.directive';

describe('FastDirective', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SlowDirective]
        });
    });
    it('should create an instance', () => {
    const directive = new SlowDirective(undefined);
    expect(directive).toBeTruthy();
    });
});
