import { TestBed } from '@angular/core/testing';
import { FastDirective } from './fast.directive';

describe('FastDirective', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FastDirective]
        });
    });
    it('should create an instance', () => {
    const directive = new FastDirective(undefined);
    expect(directive).toBeTruthy();
    });
});
