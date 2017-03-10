module models {
    'use strict';

    export interface ICustomerModel {
        id: string;
        companyName: string;
        contactName: string;
        contactTitle: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phone: string;
        fax: string;
    }

    export class CustomerModel implements ICustomerModel {
        constructor(
            public id: string = '',
            public companyName: string = '',
            public contactName: string = '',
            public contactTitle: string = '',
            public address: string = '',
            public city: string = '',
            public postalCode: string = '',
            public country: string = '',
            public phone: string = '',
            public fax: string = '') {
        }
    }
}