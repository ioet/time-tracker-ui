import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
export interface LineData {
  labels: string[];
  data: number[];
  name: string;
  developer: string;
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements AfterViewInit, OnChanges {
  @Input() lineData: LineData;
  @Input() title: string;


  @ViewChild('lineCanvas') lineCanvas: ElementRef;
  lineChart: any;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    const lineStatus = Chart.getChart('lineCanvas' + this.title);
    if (lineStatus !== undefined) {
      lineStatus.destroy();
      this.lineChartMethod();
    }
  }
  ngAfterViewInit(): void {
    this.lineChartMethod();
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.lineData.labels,

        datasets: [
          {
            label: this.title,
            fill: false,
            // lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.lineData.data,
            spanGaps: false,
          }
        ]
      },
    });
  }

}
