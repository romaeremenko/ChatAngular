import { SortByStatusPipe } from './sort-by-status.pipe';

describe('SortByStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new SortByStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
