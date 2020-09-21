import { TargetingFilterParameters } from './targeting-feature-filter-parameters';
import { TargetingFeatureFilterModel } from './targeting-feature-filter.model';
import { TargetingFilterAppContext } from './targeting-filter-app-context';

describe('TargetingFeatureFilterModel', () => {

  it('targeting feature is true when username matches', () => {
    const aUsername = 'user-a';
    const aFilterConfiguration: TargetingFilterParameters = { Audience: { Groups: ['group-x'], Users: [aUsername] } };
    const appContext: TargetingFilterAppContext = { group: 'group-y', username: aUsername };
    const targetingFeatureFilter: TargetingFeatureFilterModel = new TargetingFeatureFilterModel(aFilterConfiguration, appContext);

    const filterEvaluation = targetingFeatureFilter.evaluate();

    expect(filterEvaluation).toEqual(true);
  });

  it('targeting feature is true when group matches', () => {
    const aGroup = 'group-a';
    const aFilterConfiguration: TargetingFilterParameters = { Audience: { Groups: [aGroup], Users: ['user-a'] } };
    const appContext: TargetingFilterAppContext = { group: aGroup, username: 'user-b' };
    const targetingFeatureFilter: TargetingFeatureFilterModel = new TargetingFeatureFilterModel(aFilterConfiguration, appContext);

    const filterEvaluation = targetingFeatureFilter.evaluate();

    expect(filterEvaluation).toEqual(true);
  });

  it('targeting feature is false when neither group nor username match ', () => {
    const aFilterConfiguration: TargetingFilterParameters = { Audience: { Groups: ['group-a'], Users: ['user-a'] } };
    const appContext: TargetingFilterAppContext = { group: 'group-b', username: 'user-b' };
    const targetingFeatureFilter: TargetingFeatureFilterModel = new TargetingFeatureFilterModel(aFilterConfiguration, appContext);

    const filterEvaluation = targetingFeatureFilter.evaluate();

    expect(filterEvaluation).toEqual(false);
  });
});
