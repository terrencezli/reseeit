/**
 * Created by terrence on 4/11/17.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var receipt_service_1 = require("../shared/receipt.service");
var material_1 = require("@angular/material");
var receipt_dialog_component_1 = require("./receipt-dialog.component");
var ReceiptListComponent = (function () {
    function ReceiptListComponent(_receiptService, dialog, viewContainerRef) {
        this._receiptService = _receiptService;
        this.dialog = dialog;
        this.viewContainerRef = viewContainerRef;
        this.receipts = [];
    }
    Object.defineProperty(ReceiptListComponent.prototype, "diagnostic", {
        // TODO: Remove this when we're done
        get: function () { return JSON.stringify(this.receipts); },
        enumerable: true,
        configurable: true
    });
    ReceiptListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._receiptService.getReceipts()
            .subscribe(function (receipts) { return _this.receipts = receipts; }, function (error) { return _this.errorMessage = error; });
    };
    ReceiptListComponent.prototype.onSelect = function (event, receipt) {
        var _this = this;
        var config = new material_1.MdDialogConfig();
        config.height = '700px';
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(receipt_dialog_component_1.ReceiptDialogComponent, config);
        this.dialogRef.componentInstance.htmlBody = receipt.original_receipt_email;
        this.dialogRef.afterClosed().subscribe(function (result) {
            _this.dialogRef = null;
        });
    };
    return ReceiptListComponent;
}());
ReceiptListComponent = __decorate([
    core_1.Component({
        selector: 'receipt-list',
        templateUrl: './receipt-list.component.html',
        providers: [receipt_service_1.ReceiptService]
    }),
    __metadata("design:paramtypes", [receipt_service_1.ReceiptService,
        material_1.MdDialog,
        core_1.ViewContainerRef])
], ReceiptListComponent);
exports.ReceiptListComponent = ReceiptListComponent;
//# sourceMappingURL=receipt-list.component.js.map