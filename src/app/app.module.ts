import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import {MdToolbarModule, MdDialog, MdDialogRef, MdCardModule, MaterialModule} from '@angular/material';

import { AppComponent }  from './app.component';
import { ReceiptListComponent } from './receipts/receipt-list/receipt-list.component';
import { ReceiptDialogComponent } from './receipts/receipt-list/receipt-dialog.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SafeHtml} from "./receipts/shared/safe-html";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdCardModule,
    MaterialModule.forRoot(),
    HttpModule,
    JsonpModule
  ],
  declarations: [
    AppComponent,
    ReceiptListComponent,
    ReceiptDialogComponent,
    SafeHtml
  ],
  entryComponents: [ReceiptDialogComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
