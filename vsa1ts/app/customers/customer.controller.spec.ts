﻿/// <reference path="../../node_modules/@types/angular/index.d.ts" />
/// <reference path="../../node_modules/@types/angular-mocks/index.d.ts" />
/// <reference path="customers.module.ts" />

module customers.tests {
    'use strict';

//    window["ReSharperReporter"].prototype.jasmineDone = () => { };
    

    describe('Controller tests', () => {

        var customerServiceMock: services.ICustomerService;

        var $q: angular.IQService;
        var deferred: angular.IDeferred<{}>;
        var lookupDefer: angular.IDeferred<{}>;
        var rootScope: ng.IRootScopeService;
        var controller: customers.ICustomersController;

        var $scope;


             //Arrange
            beforeEach(() => {
                (angular as any).mock.module('customers');

                inject(($controller, _$rootScope_, _$q_) => {
                    $q = _$q_;
                    rootScope = _$rootScope_;
                    $scope = _$rootScope_.$new();
                    deferred = $q.defer();

                    // Setup spies
                    spyOn(customerServiceMock, 'getCustomers').and.returnValue(deferred.promise);
                    lookupDefer = $q.defer();
                    controller = $controller('CustomersController',
                    {
                        CustomerService: customerServiceMock
                    });
                    controller.$onInit();     // need to call manually in test, in practice it fires automatically
                });

            });

             //TEST
        it('Controller is instantiated', () => {

            //Act

            //Assert
            expect(controller).toBeDefined();
            expect(controller).not.toBeNull();

        });

    });
}



