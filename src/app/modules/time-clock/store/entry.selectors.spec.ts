import * as selectors from './entry.selectors';

describe('Entry selectors', () => {
  it('should select the message', () => {
    const anyMessage = 'my-message';
    const entryState = { message: anyMessage };

    expect(selectors.getStatusMessage.projector(entryState)).toBe(anyMessage);
  });
});
