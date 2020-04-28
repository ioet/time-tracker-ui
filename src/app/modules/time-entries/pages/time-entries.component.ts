import { Component, OnInit } from '@angular/core';
import { Entry } from '../../shared/models';

@Component({
  selector: 'app-time-entries',
  templateUrl: './time-entries.component.html',
  styleUrls: ['./time-entries.component.scss'],
})
export class TimeEntriesComponent implements OnInit {
  showModal = false;
  entryId: string;
  entry: Entry;
  entryToDelete: Entry;
  dataByMonth: Entry[];

  entryList = [
    {
      id: 'entry_1',
      project: 'Mido - 05 de Febrero',
      start_date: new Date('2020-02-05T15:36:15.887Z'),
      end_date: new Date('2020-02-05T18:36:15.887Z'),
      activity: 'development',
      technologies: ['Angular', 'TypeScript'],
      comments: 'No comments',
      ticket: 'EY-25',
    },
    {
      id: 'entry_2',
      project: 'Mido 15 de Marzo',
      start_date: new Date('2020-03-15T20:36:15.887Z'),
      end_date: new Date('2020-03-15T23:36:15.887Z'),
      activity: 'development',
      technologies: ['Angular', 'TypeScript'],
      comments: 'No comments',
      ticket: 'EY-38',
    },
    {
      id: 'entry_3',
      project: 'GoSpace 15 y 16 de Marzo',
      start_date: new Date('2020-03-15T23:36:15.887Z'),
      end_date: new Date('2020-03-16T05:36:15.887Z'),
      activity: 'development',
      technologies: ['Angular', 'TypeScript'],
      comments: 'No comments',
      ticket: 'EY-225',
    },
    {
      id: 'entry_4',
      project: 'Mido 16 de Marzo',
      start_date: new Date('2020-03-16T15:36:15.887Z'),
      end_date: new Date('2020-03-16T18:36:15.887Z'),
      activity: 'development',
      technologies: ['javascript', 'java-stream'],
      comments: 'No comments',
      ticket: 'EY-89',
    },
    {
      id: 'entry_5',
      project: 'Ernst&Young 01 de Abril',
      start_date: new Date('2020-04-01T09:36:15.887Z'),
      end_date: new Date('2020-04-01T15:36:15.887Z'),
      activity: 'development',
      technologies: ['javascript', 'java', 'java-stream'],
      comments: 'No comments',
      ticket: 'EY-59',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.dataByMonth = this.entryList.filter((entry) => entry.start_date.getMonth() === new Date().getMonth());
  }

  openModal(itemToDelete: Entry) {
    this.entryToDelete = itemToDelete;
    this.showModal = true;
  }

  editEntry(entryId: string) {
    // TODO: implement the required logic to edit an entry using the API
  }

  saveEntry(newData): void {
    // TODO: implement the required logic to save an entry using the API
  }

  removeEntry(entryId: string) {
    // TODO: implement the required logic to delete an entry using the API
  }

  getMonth(month: number) {
    this.dataByMonth = this.entryList.filter((entry) => new Date(entry.start_date).getMonth() === month);
  }
}
