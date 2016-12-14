import { Component } from '@angular/core';

import {GridOptions} from 'ag-grid/main';


import { DataService } from './services/data.service';
import { TreeViewCellRenderer } from './services/tree-view-cell-renderer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    // '../../node_modules/ag-grid/dist/styles/ag-grid.css',
    // '../../node_modules/ag-grid/dist/styles/theme-bootstrap.css'
  ],
  providers : [
    DataService
  ]
})
export class AppComponent {
  title = 'app works!';

  public gridOptions: GridOptions;
  public rowData: any[];
  public columnDefs: any[];
  public dataService: DataService;

  constructor(dataService: DataService){
    this.dataService = dataService;
    this.gridOptions = <GridOptions>{
      // getNodeChildDetails: this.getNodeChildDetails,
      rowData : dataService.getGridData(0,0),
      columnDefs : [
        // {
        //   headerName: "ID",
        //   field : "id",
        //   width: 125,
        //   // suppressSorting: true,
        //   // filter: SkillFilter
        // },
        {
          headerName: "Title",
          field: "title",
          width: 250,
          cellRendererFramework : TreeViewCellRenderer,
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
      ],
      rowSelection: 'single',
      // groupSelectsChildren : true,
      // onSelectionChanged: this.onSelectionChanged,
      onRowSelected : this.onSelectionChanged,
      //groupSelectsChildren: true,
      // suppressRowClickSelection: true,
      // groupColumnDef: {headerName: "Name", field: "name", width: 250,
      //   cellRenderer: 'group',
      //   cellRendererParams: {
      //     checkbox: true
      //   }},
      editType : 'fullRow'

    };
    // setTimeout(()=>{
    //   // this.gridOptions.api.setRowData(dataService.getNewTreeViewData());
    //   this.gridOptions.api.setRowData(dataService.getGridData(0));
    // },2000);


    // this.rowData = dataService.getTreeViewData();
    // this.gridOptions.columnDefs = dataService.getTreeViewColumnDefs();
  }

  public onRowClicked(e){
    if (e.event.target !== undefined) {
      console.log(e.event.target);
      let data = e;
      let actionType = e.event.target.getAttribute("data-action-type");

      switch(actionType) {
        case "toggleTree":
          return this.toggleTree(data);
      }
    }
  }

  public toggleTree(e){
    console.log('treeData',e);

    if(e.data.isExpanded){
      // Remove the children
    }
    else{
      e.data.isExpanded = !e.data.isExpanded;
      // Append the children
      let childrenList = this.dataService.getGridData(e.data.id,e.data.level+1); // Incrementing the level for children
      //this.gridOptions.api.
      this.gridOptions.api.insertItemsAtIndex(e.rowIndex + 1,childrenList);
    }
  }

  public onSelectionChanged(event){
    //console.log('event',event);
    //console.log(this.gridOptions);
    // let selectedRows = this.gridOptions.api.getSelectedRows();
    // alert(JSON.stringify(selectedRows));
  }
}
