import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { isEmpty } from 'lodash';
import { SubstractDatePipe } from 'src/app/modules/shared/pipes/substract-date/substract-date.pipe';

declare let pdfMake: any ;


@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {

  constructor() { }

  getTotalHoursWorkedByProject(dataTimeEntries: any) {

    const allTimeEntries = [];
    const labels = [];
    const data = [];
    const colors = [];

    dataTimeEntries.map((val) => {
      const fromDate = new Date(val.end_date);
      const substractDate = new Date(val.start_date);
      const startDate = moment(substractDate);
      const endDate = moment(fromDate);
      const duration = new SubstractDatePipe().getTimeDifference(startDate, endDate);
      const primaryObject = { project_id: val.project_id, project: val.project_name, minutes: parseInt(duration.asMinutes().toString(), 10) };
      allTimeEntries.push(primaryObject);
    });

    const allTimeEntriesFormat = allTimeEntries.reduce((acEntrie: any, addEntrie: any) => {
      const dup = acEntrie.find(addr => addr.project_id === addEntrie.project_id);
      if (dup) {
        dup.minutes = dup.minutes + addEntrie.minutes;
        return acEntrie;
      }
      return acEntrie.concat(addEntrie);
    }, []);
    allTimeEntriesFormat.map((val) => {
      labels.push(val.project);
      data.push(val.minutes);
      colors.push(this.getRandomColorRgba());
    });

    return { labels, data, title: 'Hours worked per project', colors };
  }

  getHoursWorkedDeveloper(index: number, projectsData : any, allData: any){
    const projectName = projectsData.labels[index];
    const primaryData = [];
    allData.filter((val: any) => {
      if (val.project_name === projectName ) {
        const fromDate = new Date(val.end_date);
        const substractDate = new Date(val.start_date);
        const startDate = moment(substractDate);
        const endDate = moment(fromDate);
        const duration = new SubstractDatePipe().getTimeDifference(startDate, endDate);
        primaryData.push({owner_id: val.owner_id, owner_email: val.owner_email, minutes: parseInt(duration.asMinutes().toString(), 10)});
      }
    });
    const allTimeEntriesFormat = primaryData.reduce((acEntrie: any, addEntrie: any) => {
      const dup = acEntrie.find(addr => addr.owner_id === addEntrie.owner_id);
      if (dup) {
        dup.minutes = dup.minutes + addEntrie.minutes;
        return acEntrie;
      }
      return acEntrie.concat(addEntrie);
    }, []);
    const labels = [];
    const dataValues = [];

    const backgroundColor =[];
    const borderColor = [];
    let dataAll = {label: '', data: [], backgroundColor: [], borderColor: [], borderWidth: 1};
    allTimeEntriesFormat.map((val) => {
      labels.push(val.owner_email);
      dataValues.push(val.minutes);
      const fullColor =  this.getRandomColorBBRgba();
      backgroundColor.push(fullColor.backgroundColor);
      borderColor.push(fullColor.borderColor);
    });
    dataAll.data = dataValues;
    dataAll.backgroundColor = backgroundColor;
    dataAll.borderColor = borderColor;

    return { 
      developersData: {labels, data:  [dataAll], title: 'Hours worked by developers on ' + projectName, projectName},
      dataTechAct: {labels: [],data: [], title: '', projectName: ''}
    }
  }


  getHoursWorkedByTicketByDeveloper(index: number, projectsData : any, allData: any){

    const projectName = projectsData.labels[index];
    const primaryData = [];
    allData.filter((val: any) => {
      if (val.project_name === projectName ) {
        const fromDate = new Date(val.end_date);
        const substractDate = new Date(val.start_date);
        const startDate = moment(substractDate);
        const endDate = moment(fromDate);
        const duration = new SubstractDatePipe().getTimeDifference(startDate, endDate);
        primaryData.push({owner_id: val.owner_id,
          owner_email: val.owner_email,
          ticket: val.uri,
          minutes: parseInt(duration.asMinutes().toString(), 10)}
          );
      }
    });

    const allTimeEntriesByTicket = primaryData.reduce((acEntrie: any, addEntrie: any) => {
      const dup = acEntrie.find(addr => addr.owner_id === addEntrie.owner_id && addr.ticket === addEntrie.ticket);
      if (dup) {
        dup.minutes = dup.minutes + addEntrie.minutes;
        return acEntrie;
      }
      return acEntrie.concat(addEntrie);
    }, []);
    const allTimeEntriesByDeveloper = primaryData.reduce((acEntrie: any, addEntrie: any) => {
      const dup = acEntrie.find(addr => addr.owner_id === addEntrie.owner_id);
      if (dup) {
        return acEntrie;
      }
      return acEntrie.concat(addEntrie);
    }, []);
   
    const labels = [];
    const data = [];
    allTimeEntriesByDeveloper.forEach((val: any, index) => {
      labels.push(val.owner_email);
      allTimeEntriesByTicket.forEach((valTickDev: any) => {
        if(valTickDev.owner_id === val.owner_id){
          const auxValues = Array(allTimeEntriesByDeveloper.length).fill(null);
          auxValues[index] = valTickDev.minutes;
          data.push({
            label: valTickDev.ticket,
            data: auxValues,
            backgroundColor: this.getRandomColorRgba(),
          })
        }
      })
    });

    return {labels, data, title: 'Hours worked by tickets each developers on ' + projectName, projectName }

  }

  getActAndTechByDev(value: any, developersData: any, allData: any){
    const projectName = value.name;
    const developerName = developersData.labels[value.index];

    const primaryData = [];
    let allTechnologies = [];

    allData.forEach((val: any) =>  {
      if(val.project_name === projectName && val.owner_email === developerName){
        const fromDate = new Date(val.end_date);
        const substractDate = new Date(val.start_date);
        const startDate = moment(substractDate);
        const endDate = moment(fromDate);
        const duration = new SubstractDatePipe().getTimeDifference(startDate, endDate);
        allTechnologies = allTechnologies.concat(val.technologies);
        const timeTechnologies = val.technologies.map((technology: string) => {
          return {technology, time: parseInt(duration.asMinutes().toString(), 10)}
        });
        primaryData.push({...val, timeTechnologies})
      }
    });

    allTechnologies = allTechnologies.map((name: string) => name)

    let uniqListTechnologies = [...new Set(allTechnologies)];
    uniqListTechnologies = uniqListTechnologies.map((name: string) => {return {technology: name, time: 0}})


    const allEntriesFormat = [...primaryData].reduce((acEntrie: any, addEntrie: any) => {
      const dup = acEntrie.find(addr => addr.activity_id === addEntrie.activity_id);
      if (dup) {
        dup.timeTechnologies = dup.timeTechnologies.concat(addEntrie.timeTechnologies);
        return acEntrie;
      }
      return acEntrie.concat(addEntrie);
    }, []);

    let allTech = [];
    allEntriesFormat.map((entrieVal: any) =>  {

      let result = Object.values(entrieVal.timeTechnologies.reduce((a,curr)=>{
        if(!a[curr.technology]) {
          a[curr.technology] = Object.assign({},curr);
        } else {
          a[curr.technology].time += curr.time;
         }
        return a;
      },{}));

      result = result.concat(uniqListTechnologies);

      const aux = [...result].reduce((acEntrie: any, addEntrie: any) => {
        const dup = acEntrie.find(addr => addr.technology === addEntrie.technology);
        if (dup) {
          dup.time = dup.time + addEntrie.time;
          return acEntrie;
        }
        return acEntrie.concat(addEntrie);
      }, []);


      allTech.push({act: entrieVal.activity_name, techns:  aux});
    })

    let labels = [];
    let dataset = [];
    labels = allTech.map((value: any) => value.act);
    uniqListTechnologies.map((techUnique: any) => {
          const aux = [];
          allTech.forEach((value: any) => {
            value.techns.forEach((tech: any) => {
              if(techUnique.technology === tech.technology){
                aux.push(tech.time)
              }
            })
          });
          dataset.push({
            label: techUnique.technology,
            type: "bar",
            stack: "Base",
            backgroundColor: this.getRandomColorRgba(),
            data: aux,
          });
    });
  return {
    labels: labels,
      data: dataset,
      title: 'Activities carried out and Technologies used by ' + developerName + ' on Project ' + projectName, projectName
    }
};

  getRandomColorRgba() {
    const transparency = Math.random;
    const num = Math.round(0xffffff * Math.random());
    const r = num >> 16;
    const g = num >> 8 & 255;
    const b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b  +', '+ transparency().toFixed(1) + ')';
  }

  getRandomColorBBRgba() {
    const color = Math.round;
    const r = Math.random;
    const s = 255;
    const c1 = color(r() * s);
    const c2 = color(r() * s);
    const c3 = color(r() * s);
    const backgroundColor = 'rgba(' + c1 + ',' + c2 + ',' + c3 + ',' + 0.2 + ')';
    const borderColor = 'rgba(' + c1 + ',' + c2 + ',' + c3 + ',' + 1 + ')';
    return {backgroundColor, borderColor};
  }

  generatePdf(nameChart: string, titleCustom: string, descriptionCustom:  string) {
    const docDefinition = { content: [],
      styles: {
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'red'
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
          alignment: 'center'
        },
        subsubheader: {
          fontSize: 12,
          italics: true,
          margin: [0, 10, 0, 25],
          alignment: 'center'
        },
        table: {
          margin: [0, 15, 0, 25]
        }
      },
      defaultStyle: {
        // alignment: 'justify'
      },
      pageOrientation: 'landscape',
    };

    const title = {text: titleCustom, style: 'subheader'};
    const description = {text: descriptionCustom, style: 'subsubheader'};
    docDefinition.content.push(title);
    docDefinition.content.push(description);
    const canvas: HTMLCanvasElement = document.getElementById(nameChart) as HTMLCanvasElement;
    const canvasImage = canvas.toDataURL('image/png', 1.0);

    docDefinition.content.push({image: canvasImage, width: 500});
    pdfMake.createPdf(docDefinition).download('chartToPdf' + '.pdf');

  }


}
