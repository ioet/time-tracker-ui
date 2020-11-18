import * as selectors from './user.selectors';

describe('UserSelectors', () => {
  it('should select is Loading', () => {
    const isLoadingValue = true;
    const userState = { isLoading: isLoadingValue };

    expect(selectors.getIsLoading.projector(userState)).toBe(isLoadingValue);
  });
});
