import * as selectors from './technology.selectors';
import { TechnologyState } from './technology.reducers';

describe('Technology selectors', () => {

  it('should select technologies', () => {

    const state: TechnologyState = { technologyList: {items: []}, isLoading: false };

    expect(selectors.allTechnologies.projector(state)).toEqual(state);
  });
});

