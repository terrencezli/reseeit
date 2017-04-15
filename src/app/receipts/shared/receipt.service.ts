/**
 * Created by terrence on 4/13/17.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Receipt} from "../receipt/receipt";
import 'rxjs/add/operator/map'

@Injectable()
export class ReceiptService {
    constructor(private _http: Http) {}

    getReceipts(): Observable<Receipt[]> {
        return this._http
            .get('/api/receipts')
            .map((response: Response) => <Receipt[]> response.json());
    }
}