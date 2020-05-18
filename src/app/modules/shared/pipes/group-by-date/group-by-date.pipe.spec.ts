import { GroupByDatePipe } from './group-by-date.pipe';

describe('GroupByDatePipe', () => {
  it('create an instance', () => {
    const pipe = new GroupByDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('create an instance', () => {
    const pipe = new GroupByDatePipe();
    const date = '2020-02-05T15:36:15.887Z';
    const result = pipe.getDate(date);
    expect(result).toEqual(new Date('2/5/2020').toLocaleDateString());
  });

  it('should group two entries as one', () => {
    const entryList = [
      {
        id: 'entry_1',
        project: 'Mido - 05 de Febrero',
        startDate: '2020-02-05T15:36:15.887Z',
        endDate: '2020-02-05T18:36:15.887Z',
        activity_id: 'development',
        technology: 'Angular, TypeScript',
        comments: 'No comments',
        ticket: 'EY-25',
      },
      {
        id: 'entry_2',
        project: 'Mido 15 de Marzo',
        startDate: '2020-03-15T20:36:15.887Z',
        endDate: '2020-03-15T23:36:15.887Z',
        activity_id: 'development',
        technology: 'Angular, TypeScript',
        comments: 'No comments',
        ticket: 'EY-38',
      },
      {
        id: 'entry_3',
        project: 'GoSpace 15 y 16 de Marzo',
        startDate: '2020-03-15T23:36:15.887Z',
        endDate: '2020-03-16T05:36:15.887Z',
        activity_id: 'development',
        technology: 'Angular, TypeScript',
        comments: 'No comments',
        ticket: 'EY-225',
      },
      {
        id: 'entry_4',
        project: 'Mido 16 de Marzo',
        startDate: '2020-03-16T15:36:15.887Z',
        endDate: '2020-03-16T18:36:15.887Z',
        activity_id: 'development',
        technology: 'Angular, TypeScript',
        comments: 'No comments',
        ticket: 'EY-89',
      },
      {
        id: 'entry_5',
        project: 'Ernst&Young 01 de Abril',
        startDate: '2020-04-01T09:36:15.887Z',
        endDate: '2020-04-01T15:36:15.887Z',
        activity_id: 'development',
        technology: 'Angular, TypeScript',
        comments: 'No comments',
        ticket: 'EY-59',
      },
    ];
    const pipe = new GroupByDatePipe();
    const result = pipe.transform(entryList);
    expect(result.length).toBe(entryList.length - 1);
  });
});
