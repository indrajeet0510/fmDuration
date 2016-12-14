import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {AgGridModule} from "ag-grid-ng2/main";

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { MockDataService } from './services/mock-data.service';
import { TreeViewCellRenderer } from './services/tree-view-cell-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeViewCellRenderer
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgGridModule.withComponents([
      // Add custom developed components to be plugged here
      TreeViewCellRenderer
    ])
  ],
  providers: [DataService,MockDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
