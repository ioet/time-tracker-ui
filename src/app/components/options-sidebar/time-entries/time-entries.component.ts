import { Component, OnInit } from '@angular/core';
import { Entry } from '../../../interfaces';

@Component({
  selector: 'app-time-entries',
  templateUrl: './time-entries.component.html',
  styleUrls: ['./time-entries.component.scss']
})
export class TimeEntriesComponent implements OnInit {

  showModal: boolean = false;
  entryId: string;
  entry: Entry;
  entryToDelete: Entry;
  dataByMonth: Entry[];

  entryList = [
    {
      id: 'entry_1',
      project: 'Mido - 05 de Febrero',
      startDate: '2020-02-05T15:36:15.887Z',
      endDate: '2020-02-05T18:36:15.887Z',
      activity: 'development',
      technology: 'Angular, TypeScript',
      comments: 'No comments',
      ticket: 'EY-25'
    },
    {
      id: 'entry_2',
      project: 'Mido 15 de Marzo',
      startDate: '2020-03-15T20:36:15.887Z',
      endDate: '2020-03-15T23:36:15.887Z',
      activity: 'development',
      technology: 'Angular, TypeScript',
      comments: 'No comments',
      ticket: 'EY-38'
    },
    {
      id: 'entry_3',
      project: 'GoSpace 15 y 16 de Marzo',
      startDate: '2020-03-15T23:36:15.887Z',
      endDate: '2020-03-16T05:36:15.887Z',
      activity: 'development',
      technology: 'Angular, TypeScript',
      comments: 'No comments',
      ticket: 'EY-225'
    },
    {
      id: 'entry_4',
      project: 'Mido 16 de Marzo',
      startDate: '2020-03-16T15:36:15.887Z',
      endDate: '2020-03-16T18:36:15.887Z',
      activity: 'development',
      technology: 'Angular, TypeScript',
      comments: 'No comments',
      ticket: 'EY-89'
    },
    {
      id: 'entry_5',
      project: 'Ernst&Young 01 de Abril',
      startDate: '2020-04-01T09:36:15.887Z',
      endDate: '2020-04-01T15:36:15.887Z',
      activity: 'development',
      technology: 'Angular, TypeScript',
      comments: 'No comments',
      ticket: 'EY-59'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.dataByMonth = this.entryList.filter(entry => new Date(entry.startDate).getMonth() === new Date().getMonth());
  }

  openModal(itemToDelete: Entry) {
    this.entryToDelete = itemToDelete;
    this.showModal = true;
  }

  editEntry(entryId: string) {
    this.entryId = entryId;
    this.entry = this.entryList.find((entry) => entry.id === entryId);
  }

  saveEntry(newData): void {
    const entryIndex = this.entryList.findIndex((entry => entry.id === this.entryId));
    this.entryList[entryIndex].project = newData.project;
    this.entryList[entryIndex].activity = newData.activity;
    this.entryList[entryIndex].technology = newData.technology;
    this.entryList[entryIndex].ticket = newData.jiraTicket;
    this.entryList[entryIndex].comments = newData.notes;
  }

  removeEntry(entryId: string) {
    this.dataByMonth = this.dataByMonth.filter((entry: Entry) => entry.id !== entryId);
  }

  getMonth(month: number) {
    this.dataByMonth = this.entryList.filter(entry => new Date(entry.startDate).getMonth() === month);
  }
}
