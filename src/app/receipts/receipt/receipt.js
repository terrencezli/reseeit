/**
 * Created by terrence on 4/10/17.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Receipt = (function () {
    function Receipt(id, store, date, totalCost, originalReceiptEmail) {
        this.id = id;
        this.store = store;
        this.date = date;
        this.totalCost = totalCost;
        this.originalReceiptEmail = originalReceiptEmail;
    }
    return Receipt;
}());
exports.Receipt = Receipt;
//# sourceMappingURL=receipt.js.map