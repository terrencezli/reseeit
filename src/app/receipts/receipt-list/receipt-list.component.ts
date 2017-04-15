/**
 * Created by terrence on 4/11/17.
 */

import {Component, OnInit, ViewContainerRef} from '@angular/core';

import { Receipt }    from '../receipt/receipt';
import {ReceiptService} from "../shared/receipt.service";
import {MdDialogRef, MdDialogConfig, MdDialog} from "@angular/material";
import {ReceiptDialogComponent} from "./receipt-dialog.component";

@Component({
    selector: 'receipt-list',
    templateUrl: './receipt-list.component.html',
    providers: [ReceiptService]
})
export class ReceiptListComponent implements OnInit{
    receipts: Receipt[] = [];
    errorMessage: string;
    dialogRef: MdDialogRef<any>;

    constructor(
        private _receiptService: ReceiptService,
        public dialog: MdDialog,
        public viewContainerRef: ViewContainerRef
    ) {

    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.receipts); }

    ngOnInit(): void {
        this._receiptService.getReceipts()
            .subscribe(
                receipts => this.receipts = receipts,
                error => this.errorMessage = <any>error
            )
    }

    onSelect(event: any, receipt: any) {
        let config = new MdDialogConfig();
        config.height = '700px';
        config.viewContainerRef = this.viewContainerRef;

        this.dialogRef = this.dialog.open(ReceiptDialogComponent, config);
        this.dialogRef.componentInstance.htmlBody = receipt.original_receipt_email;

        this.dialogRef.afterClosed().subscribe(result => {
            this.dialogRef = null;
        });
    }

}
