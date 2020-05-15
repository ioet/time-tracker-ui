import * as selectors from './entry.selectors';

describe('Entry selectors', () => {
  it('should select the message', () => {
    const anyMessage = 'my-message';
    const entryState = { message: anyMessage };

    expect(selectors.getStatusMessage.projector(entryState)).toBe(anyMessage);
  });

  it('should select the entry list', () => {
    const entryList = [];
    const entryState = { entryList };

    expect(selectors.allEntries.projector(entryState)).toBe(entryList);
  });

  // it('should select the entry summary', () => {

  // })
});
