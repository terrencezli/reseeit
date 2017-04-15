"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var material_1 = require("@angular/material");
var app_component_1 = require("./app.component");
var receipt_list_component_1 = require("./receipts/receipt-list/receipt-list.component");
var receipt_dialog_component_1 = require("./receipts/receipt-list/receipt-dialog.component");
var animations_1 = require("@angular/platform-browser/animations");
var safe_html_1 = require("./receipts/shared/safe-html");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            material_1.MdToolbarModule,
            material_1.MdCardModule,
            material_1.MaterialModule.forRoot(),
            http_1.HttpModule,
            http_1.JsonpModule
        ],
        declarations: [
            app_component_1.AppComponent,
            receipt_list_component_1.ReceiptListComponent,
            receipt_dialog_component_1.ReceiptDialogComponent,
            safe_html_1.SafeHtml
        ],
        entryComponents: [receipt_dialog_component_1.ReceiptDialogComponent],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map