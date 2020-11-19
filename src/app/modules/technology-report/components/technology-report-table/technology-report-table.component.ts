import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as dataMock from './data.json';

@Component({
  selector: 'app-technology-report-table',
  templateUrl: './technology-report-table.component.html',
  styleUrls: ['./technology-report-table.component.scss']
})

export class TechnologyReportTableComponent implements OnInit {
  dtOptions: any = {};
  technologies: any  = (dataMock  as  any).default;

  ngOnInit(): void {
    this.dtOptions = {
      scrollY: '600px',
      paging: false,
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'colvis',
          columns: ':not(.hidden-col)',
        },
        'print',
        {
          extend: 'excel',
          text: 'Excel',
          filename: `technologies-${formatDate(new Date(), 'MM_dd_yyyy-HH_mm', 'en')}`
        },
        {
          extend: 'csv',
          text: 'CSV',
          filename: `technologies-${formatDate(new Date(), 'MM_dd_yyyy-HH_mm', 'en')}`
        }
      ],
      responsive: true
    };
  }
}
