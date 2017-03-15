
module customers.tests {
    'use strict';

//    window["ReSharperReporter"].prototype.jasmineDone = () => { };
    

    describe('Customer controller tests', () => {

        var customerList: models.ICustomerModel[] = [];
        var customerServiceMock: services.ICustomerService;

        var $q: angular.IQService;
        var deferred: angular.IDeferred<{}>;
        var rootScope: ng.IRootScopeService;
        var controller: customers.ICustomersController;

        var $scope;


             //Arrange
        beforeEach(() => {

            (angular as any).mock.module('customers');


            customerServiceMock = {
                getCustomers: () => {
                    return $q.defer().promise;
                },
                getCustomer: () => {
                    return $q.defer().promise;
                }
            }

            // Setup customer list with three customers
            customerList = [];
            var customer1: models.ICustomerModel = new models.CustomerModel('One', 'CompanyNameOne', 'ContactNameOne');
            var customer2 = new models.CustomerModel('Two', 'CompanyNameTwo', 'ContactNameTwo');
            var customer3 = new models.CustomerModel('Three', 'CompanyNameThree', 'ContactNameThree');
            customerList.push(customer1);
            customerList.push(customer2);
            customerList.push(customer3);

            inject(($controller, _$rootScope_, _$q_) => {
                $q = _$q_;
                rootScope = _$rootScope_;
                $scope = _$rootScope_.$new();
                deferred = $q.defer();

                // Setup spies
                spyOn(customerServiceMock, 'getCustomers').and.returnValue(deferred.promise);
                controller = $controller('CustomersController',
                {
                    CustomerService: customerServiceMock
                });
                controller.$onInit();     // need to call manually in test, in practice it fires automatically
            });

        });

             //TEST
        it('Controller is instantiated', () => {

            //Assert
            expect(controller).toBeDefined();
            expect(controller).not.toBeNull();

        });

        it('$onInit() calls getCustomers', () => {

            //Assert
            expect(customerServiceMock.getCustomers).toHaveBeenCalled();

        });

        it('customerList contains three customers', () => {

            //Act
            deferred.resolve(customerList);
            $scope.$apply();

            // Assert
            expect(controller.customers.length).toBe(customerList.length);
        });

    });
}



