
module services {
    'use strict';

    export interface IOrderService {
        getOrders(string): ng.IPromise<models.IOrderModel[]>;
        getOrderDetail(number): ng.IPromise<models.IOrderModel>;
    }

    export class OrderService implements IOrderService {
        static $inject = ['$http', '$q'];
        host: string;

        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {

        }

        getOrders(id: string): ng.IPromise<models.IOrderModel[]> {
            var def = this.$q.defer();
            var datapath = 'http://northwind.servicestack.net/query/orders.json?CustomerId=' + id;

            this.$http.get<models.IOrderModel[]>(datapath, { cache: true })
                .then((data) => {
                    def.resolve(data.data['Results']);
                })
                .catch(() => {
                    def.reject('Failed to get orders data');
                });
            return def.promise;
        }

        getOrderDetail(id: number): ng.IPromise<models.IOrderModel> {
            var def = this.$q.defer();
            var datapath = 'http://northwind.servicestack.net/query/orders.json?Id=' + id;

            this.$http.get<models.IOrderModel>(datapath, { cache: true })
                .then((data) => {
                    def.resolve(data.data['Results'][0]);   // returns an array, just grab [0]
                })
                .catch(() => {
                    def.reject('Failed to get order detail data');
                });
            return def.promise;
        }
    }
    angular
        .module('services')
        .service('OrderService', OrderService);
}
