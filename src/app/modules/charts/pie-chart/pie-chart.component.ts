import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {UtilsChartsPipe} from '../pipes/utils-chart.pipe';


export interface PieData {
  labels: string[];
  data: number[];
  colors: string[];
}
let globalProjectSelected;
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements AfterViewInit {
  @Input() pieData: PieData;
  @Input() title: string;
  @Output() projectSelected = new EventEmitter<number>();
  @Output() downloadPdf = new EventEmitter<any>();


  @ViewChild('pieCanvas') private pieCanvas: ElementRef;

  pieChart: any;

  constructor() {
    Chart.register(ChartDataLabels);
    globalProjectSelected = this.projectSelected;
   }

  ngAfterViewInit() {
    this.pieChartBrowser();
  }

  pieChartBrowser(): void {
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: this.pieData.labels,
        datasets: [{
          backgroundColor: this.pieData.colors,
          data: this.pieData.data
        }]
      },
      options: {
        animation: {
          onComplete: this.animationChart,
        },
        onClick: this.graphClickEvent,
        plugins: {
          title: {
            display: true,
            text: this.title,
            font: {
              size: 20
            },
            align: 'start'
          },
          legend: {
            position: 'right',
          },
          tooltip: {
              callbacks: {
                label: this.formatLabelPieChart
              }
          },
          datalabels: {
            display: true,
            align: 'center',
            font: {
              size: 16,
            },
            formatter: this.formaterDatalabels
          }
        }
      }
    });
  }
  animationChart(animation) {
    const firstSet = animation.chart.config.data.labels;
    if (firstSet.length === 0){
      document.getElementById('download-button').style.display = 'none';
      document.getElementById('no-data-pieChart').style.display = 'block';
      document.getElementById('pieChart').style.display = 'none';
    }else{
      document.getElementById('no-data-pieChart').style.display = 'none';
      document.getElementById('pieChart').style.display = 'block';
      document.getElementById('download-button').style.display = 'block';
    }
  }

  formaterDatalabels(value) {
    return  new UtilsChartsPipe().transform(value);
  }

  formatLabelPieChart(context) {
    const label = new UtilsChartsPipe().transform(context.raw);
    return label;
  }

  graphClickEvent(event, array){
    globalProjectSelected.emit(array[0].index);
  }

  generatePdf(){
    this.downloadPdf.emit({chart: 'pieChart', title: 'Projects' , description: 'Hours worked on projects by developers'});
  }

}
