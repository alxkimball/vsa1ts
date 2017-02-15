module models {
    'use strict';

    export interface IOrderModel {
        'id': number,
        'customerId': string,
        'employeeId': number,
        'orderDate': string,
        'requiredDate': string,
        'shippedDate': string,
        'shipVia': string,
        'freight': number,
        'shipName': string,
        'shipAddress': string,
        'shipCity': string,
        'shipPostalCode': string,
        'shipCountry': string;
    }

    export class OrderModel implements IOrderModel {
        constructor(
            public id: number = 0,
            public customerId = '',
            public employeeId = 0,
            public orderDate = '',
            public requiredDate = '',
            public shippedDate = '',
            public shipVia = '',
            public freight = 0.0,
            public shipName = '',
            public shipAddress = '',
            public shipCity = '',
            public shipPostalCode = '',
            public shipCountry= '') {
        }
    }
}