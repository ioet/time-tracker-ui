import { TestBed, waitForAsync } from '@angular/core/testing';

import { NumberFormatter } from './number.formatter';
import { CreateCustomerComponent } from '../../customer-management/components/customer-info/components/create-customer/create-customer';
import { CreateProjectComponent } from '../../customer-management/components/projects/components/create-project/create-project.component';
import { CreateProjectTypeComponent } from '../../customer-management/components/projects-type/components/create-project-type/create-project-type.component';
import { ProjectListComponent } from '../../customer-management/components/projects/components/project-list/project-list.component';
import { ProjectTypeListComponent } from '../../customer-management/components/projects-type/components/project-type-list/project-type-list.component';


describe('NumberFormatter', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        NumberFormatter,
        CreateCustomerComponent,
        CreateProjectComponent,
        CreateProjectTypeComponent,
        ProjectListComponent,
        ProjectTypeListComponent,
      ],
    }).compileComponents();
  }));

  it('adds a 0 if value < 10', () => {
    const numberFormatter = new NumberFormatter(9);

    expect(numberFormatter.getAsAtLeastTwoDigitString()).toEqual('09');
  });

  it('returns the same value if number < 10', () => {
    const numberMajorThan10 = 19;
    const numberFormatter = new NumberFormatter(numberMajorThan10);

    expect(numberFormatter.getAsAtLeastTwoDigitString()).toEqual(numberMajorThan10.toString());
  });

});
