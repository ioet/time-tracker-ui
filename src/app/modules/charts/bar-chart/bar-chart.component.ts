import { Component, AfterViewInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import Chart from 'chart.js/auto';
import {UtilsChartsPipe} from '../pipes/utils-chart.pipe';

export interface BarData {
  labels: string[];
  data: any[];
  projectName: string;
}

let globalDeveloperSelected;
let globalValues;

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements AfterViewInit, OnChanges {
  @Input() barData: BarData;
  @Input() title: string;
  @Input() showLegend: boolean = false;

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @Output() developerSelected = new EventEmitter<any>();
  @Output() downloadPdf = new EventEmitter<any>();

  barChart: any;

  constructor() {
    globalDeveloperSelected = this.developerSelected;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const chartStatus = Chart.getChart('barCanvas');
    if (chartStatus !== undefined) {
      chartStatus.destroy();
      globalValues = this.barData;
      this.barChartMethod();
    }
  }

  ngAfterViewInit(): void {
    this.barCanvas.nativeElement.focus();
    globalValues = this.barData;
    this.barChartMethod();
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.barData.labels,
        datasets: this.barData.data,
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: this.title
          },
          datalabels: {
            display: true,
            align: 'center',
            font: {
              size: 18,
            },
            formatter: this.formaterDatalabels
          },
          tooltip: {
            callbacks: {
              label: this.formatTolltipBarChart
            }
          },
          legend: {
            display: this.showLegend,
          }
        },
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: this.ticksFormat
            },
            title: {
              display: true,
              text: 'Hours'
            }
          },
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Developers'
            }
          },
        },
        onClick: this.graphClickEvent,
      }
    });
  }

  ticksFormat(value, index, ticks) {
    return new UtilsChartsPipe().transformCommon(Number(value));
  }

  graphClickEvent(event, array){
    globalDeveloperSelected.emit({ index: array[0].index, name: globalValues.projectName });
  }

  formaterDatalabels(value) {
    return  new UtilsChartsPipe().transform(value);
  }

  formatTolltipBarChart(context){
    return new UtilsChartsPipe().transformCommon(Number(context.raw)) + ' Hour(s)';
  }
  
  generatePdf(){
    this.downloadPdf.emit({chart: 'barCanvas', title: this.title, description: ''});
  }
}
