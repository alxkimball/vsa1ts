module models  {
    'use strict';

export interface ICustomerModel{

}

export class CustomerModel implements ICustomerModel{
    constructor(public id: number = 0,
           public firstName: string = "",
           public middleName: string = "",
           public lastName: string = ""){
               
           }
}


}