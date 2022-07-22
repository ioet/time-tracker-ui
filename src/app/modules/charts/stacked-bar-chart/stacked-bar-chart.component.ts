import { Component, AfterViewInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import Chart from 'chart.js/auto';
import {UtilsChartsPipe} from '../pipes/utils-chart.pipe';


export interface StackedData {
  label: string;
  data: [];
  backgroundColor: string;
}

export interface StackedAllData {
  labels: string[];
  data: StackedData[];
  projectName: string;
  title: string;
}

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss']
})
export class StackedBarChartComponent implements AfterViewInit, OnChanges {
  @Input() stackedBardData: StackedAllData;
  @Input() title: string;
  @Output() downloadPdf = new EventEmitter<any>();

  @ViewChild('barCanvas') private stackedBarCanvas: ElementRef;

  stackedBarChart: any;


  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const chartStatus = Chart.getChart('stackedBarCanvas');
    if (chartStatus !== undefined) {
      chartStatus.destroy();
      this.stackedBarChartMethod();
    }
  }

  ngAfterViewInit(): void {
    this.stackedBarCanvas.nativeElement.focus();
    this.stackedBarChartMethod();
  }

  stackedBarChartMethod() {
    this.stackedBarChart = new Chart(this.stackedBarCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.stackedBardData.labels, 
        datasets : this.stackedBardData.data
      },
      options: {
        plugins: {
        title: {
          display: true,
          text: this.title,
          font: {
                  size: 18
          }
        },
        datalabels: {
          display: true,
          align: 'center',
          font: {
            size: 15,
          },
          formatter: this.formaterDatalabels
        },
        legend: {
          display: true,
          labels: {
            filter: this.formaterLegend
          }
        },
        tooltip: {
          callbacks: {
            label: this.formaterTooltip
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
          beginAtZero: true,
          title: {
            display: true,
            text: 'Developers'
          }
        },
        y: {
          stacked: true,
          beginAtZero: true,
          ticks: {
            callback: this.formaterYTicks
          },
          title: {
            display: true,
            text: 'Hours'
          }
        }
      }
    }})
  }

  formaterDatalabels(value){
    return  value !== null ? new UtilsChartsPipe().transform(value): '';
  }

  formaterLegend(legendItem, data) {
    const label = legendItem.text
    legendItem.text = label.split('/').pop() || '';
    return true
  }

  formaterTooltip(context) {
    const hours = new UtilsChartsPipe().transformCommon(Number(context.raw)) + ' Hour(s)';
    return context.dataset.label + ': ' + hours;
  }

  formaterYTicks(value, index, values) {
    return new UtilsChartsPipe().transformCommon(Number(value));
  }

  generatePdf(){
    this.downloadPdf.emit({chart : 'stackedBarCanvas', title: this.title, description: ''});
  }

}
