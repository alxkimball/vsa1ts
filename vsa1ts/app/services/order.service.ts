
module services {
    'use strict';

    export interface IOrderService {
        getOrders(): ng.IPromise<models.IOrderModel[]>;
    }

    export class OrderService implements IOrderService {
        static $inject = ['$http', '$q'];
        host: string;

        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {

        }

        getOrders(): ng.IPromise<models.IOrderModel[]> {
            var def = this.$q.defer();

            this.$http.get<models.IOrderModel[]>('../data/orders.json', { cache: true })
                .then((data) => {
                    def.resolve(data);
                })
                .catch(() => {
                    def.reject('Failed to get phone types');
                });

            return def.promise;
        }
    }
    angular
        .module('services')
        .service('OrderService', OrderService);
}
