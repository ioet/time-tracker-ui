import { Component, AfterViewInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import Chart from 'chart.js/auto';
import {UtilsChartsPipe} from '../pipes/utils-chart.pipe';


export interface BarData {
  labels: string[];
  data: any[];
  projectName: string;
}
@Component({
  selector: 'app-bar-chart-group',
  templateUrl: './bar-chart-group.component.html',
  styleUrls: ['./bar-chart-group.component.scss']
})
export class BarChartGroupComponent  implements AfterViewInit, OnChanges {
  @Input() barData: BarData;
  @Input() title: string;
  @Input() showLegend: boolean = false;

  @ViewChild('barCanvasGroup') private barCanvas: ElementRef;
  @Output() downloadPdf = new EventEmitter<any>();

  barChart: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const chartStatus = Chart.getChart('barCanvasGroup');
    if (chartStatus !== undefined) {
      chartStatus.destroy();
      this.barChartGroupMethod();
    }
  }

  ngAfterViewInit(): void {
    this.barCanvas.nativeElement.focus();
    this.barChartGroupMethod();
  }

  barChartGroupMethod() {
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
            display: false,
            align: 'center',
            font: {
              size: 12,
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
              text: 'Activities'
            }
          },
        },
      }
    });
  }

  ticksFormat(value, index, ticks) {
    return new UtilsChartsPipe().transformCommon(Number(value));
  }

  formaterDatalabels(value) {
    return  new UtilsChartsPipe().transform(value);
  }

  formatTolltipBarChart(context){
    return new UtilsChartsPipe().transformCommon(Number(context.raw)) + ' Hour(s)';
  }
  
  generatePdf(){
    this.downloadPdf.emit({chart: 'barCanvasGroup', title: this.title, description: ''});
  }

}
