module services {
    'use strict';

    export interface ICustomerService {
        getCustomers(): ng.IPromise<models.ICustomerModel[]>;
        getCustomer(customerId: string): ng.IPromise<models.ICustomerModel>;
        saveCustomer(customer: models.ICustomerModel): ng.IPromise<models.ICustomerModel>;
        deleteCustomer(customer: models.ICustomerModel): ng.IPromise<models.ICustomerModel>;
    }

    export class CustomerService implements ICustomerService {
        static $inject = ['$http', '$q','$location','$sce'];
        host: string;

        constructor(private $http: ng.IHttpService, private $q: ng.IQService,
                    private $location: ng.ILocationService, private $sce: ng.ISCEService) {
            this.host = $location.host();
        }

        getCustomers(): ng.IPromise<models.ICustomerModel[]>{
            var def = this.$q.defer();
            this.$location.path('/app/data/customers.json');
            var url = this.$sce.trustAsResourceUrl(this.$location.absUrl());

            this.$http.get<models.ICustomerModel[]>(url, { cache: true })
                .then((results) => {
                    def.resolve(results.data['Customers']);
                })
                .catch((error) => {
                    var message = error;
                    def.reject('Failed to get customers');
                });
            return def.promise;
        }
        getCustomer(customerId: string): ng.IPromise<models.ICustomerModel>{
            var def = this.$q.defer();

            return def.promise;
        }

        saveCustomer(customer: models.ICustomerModel): ng.IPromise<models.ICustomerModel>{
            var def = this.$q.defer();

            return def.promise;
        }

        deleteCustomer(customer: models.ICustomerModel): ng.IPromise<models.ICustomerModel>{
            var def = this.$q.defer();

            return def.promise;
        }

    }
    angular
        .module('services')
        .service('CustomerService', CustomerService);
}
