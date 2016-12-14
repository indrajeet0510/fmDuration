import {Component} from '@angular/core';
import { AgRendererComponent } from 'ag-grid-ng2/main';

@Component({
  selector: 'tree-view-cell',
  styles : [
    `
      .tree-control{
        display: inline-block;
        min-width:20px;
        min-height:20px;
        font-size:1.2em;
        font-weight:bold;
        cursor:pointer;
      }
    `
  ],
  template: `
    <div>
    <span [ngStyle]="{ 'margin-left.px' : marginLeft}"></span> 
    <span data-action-type="toggleTree" class="tree-control" *ngIf="params.data.hasChildren">
      <span data-action-type="toggleTree" *ngIf="params.data.isExpanded">-</span>
      <span data-action-type="toggleTree" *ngIf="!params.data.isExpanded">+</span>
    </span>
    {{params.value}}
    </div>
  `
})
export class TreeViewCellRenderer implements AgRendererComponent {
  private params:any;

  private marginLeft;

  agInit(params:any):void {
    // console.log('params',params);
    this.params = params;
    this.marginLeft = (this.params.data.level + 1) * 10;
  }

  // private valueSquared():number {
  //   return this.params.value * this.params.value;
  // }
}
