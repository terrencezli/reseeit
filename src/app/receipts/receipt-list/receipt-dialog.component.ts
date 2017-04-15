/**
 * Created by terrence on 4/14/17.
 */
import { MdDialog, MdDialogRef } from '@angular/material';
import {Component} from '@angular/core';

@Component({
    selector: 'receipt-dialog',
    template: '<md-dialog-container [innerHTML]="htmlBody | safeHtml"></md-dialog-container>'
})
export class ReceiptDialogComponent {
    htmlBody: string;

    constructor(public dialogRef: MdDialogRef<any>) { }
}
