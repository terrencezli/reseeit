/**
 * Created by terrence on 4/10/17.
 */

export class Receipt {

    constructor(
        public id: number,
        public store: string,
        public date: string,
        public totalCost: number,
        public originalReceiptEmail: string
    ) {  }

}