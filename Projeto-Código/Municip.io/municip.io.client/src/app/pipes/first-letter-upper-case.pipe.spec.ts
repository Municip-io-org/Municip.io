import { FirstLetterUpperCasePipe } from './first-letter-upper-case.pipe';

describe('FirstLetterUpperCasePipe', () => {
  it('create an instance', () => {
    const pipe = new FirstLetterUpperCasePipe();
    expect(pipe).toBeTruthy();
  });
});
