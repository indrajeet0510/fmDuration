import { Injectable } from '@angular/core';
import  * as _  from 'lodash';
import { MockDataService } from './mock-data.service'

@Injectable()
export class DataService{

  data:any[] = [];

  constructor(){
    this.data = this.getData();
  }

  public getGridData(parentId,level){
    let nodeList =  _.filter(this.data,{ parent : parentId});
    let counter = 0;
    while(counter < nodeList.length){
      let childrenNodeList = _.filter(this.data, { parent :  nodeList[counter].id });
      nodeList[counter].hasChildren = (childrenNodeList.length) ? true : false;
      nodeList[counter].level = level;
      nodeList[counter].isExpanded = false;
      counter++;
    }
    console.log('nodeList',nodeList);
    return JSON.parse(JSON.stringify(nodeList));
  }


  public getData(): any[]{
    let data = [];
    let counter = 0;
    while(counter < 50){
      data.push({
        id : ++counter,
        title : 'node-'+counter.toString(),
        amount : (Math.random() * (5000 - 50) + 50).toFixed(2),
        status : (Math.floor(Math.random() * (Math.floor(counter)))) ? true : false,
        parent : (counter < 4) ? 0 : Math.floor(Math.random() * (Math.floor(counter)))
      })
    }

    return data;

  }

  public getColumnDefs(): any[]{
    return [
      {
        headerName: "ID",
        field : "id",
        width: 125,
        suppressSorting: true,
        cellRenderer : 'group'
        // cellRenderer: skillsCellRenderer,
        // filter: SkillFilter
      },
      {
        headerName: "Title",
        field: "title",
        width: 250,
        // cellRenderer: percentCellRenderer,
        // filter: ProficiencyFilter
      },
      {
        headerName: "Amount",
        field: "amount",
        width: 250,
        // cellRenderer: percentCellRenderer,
        // filter: ProficiencyFilter
      },
      {
        headerName: "Status",
        field: "status",
        width: 100,
        // cellRenderer: percentCellRenderer,
        // filter: ProficiencyFilter
      },

      {
        headerName: "Parent ID",
        field: "parent",
        width: 100,
        // cellRenderer: percentCellRenderer,
        // filter: ProficiencyFilter
      }
    ];

  }

}
