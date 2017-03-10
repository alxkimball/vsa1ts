module customers.tests {


    describe('CustomerList controller tests', () => {

        var customerList: models.ICustomerModel[] = [];

        var $q: angular.IQService;
        var deferred: angular.IDeferred<{}>;
        var rootScope: ng.IRootScopeService;
        var controller: customers.ICustomerListController;

        var $scope;



        //Arrange
        beforeEach(() => {

            (angular as any).mock.module('customers');



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

                var bindings = {
                    customers: customerList,
                    onSelected: jasmine.createSpy('onSelected')
                };

                // Setup spies
                controller = $controller('CustomerListController', {}, bindings);
                controller.$onInit();     // need to call manually in test, in practice it fires automatically
            });

        });

        describe('controller initialization',() =>
        {
            //TEST
            it('controller is instantiated', () => {

                //Assert
                expect(controller).toBeDefined();
                expect(controller).not.toBeNull();

            });

            it('controller retrieved data from parent', () => {

                //Assert
                expect(controller.customers.length).toBe(customerList.length);
            });
            
        });

        describe('onChanges', () => {

            beforeEach(() => {
                // new customer created and passed to list component
                var customer4: models.ICustomerModel = new models.CustomerModel('Four', 'CompanyNameFour', 'ContactNameFour');
                customerList.push(customer4);

                // set current selected customerId
                controller.selectedCustomerId = 'One';

                var changesObj = {
                    customers: {
                        currentValue: customerList    // pass in an updated customer list
                    }
                };
                controller.$onChanges(changesObj);
            });

            it('reloads customerList', () => {

                // Assert
                expect(controller.customers.length).toBe(customerList.length);
            });

            it('clears selectedCustomerId', () => {

                // Assert
                expect(controller.selectedCustomerId).toBe('');
            });
        });



        it('showOrders() calls onSelected callback with selected id', () => {

            // Act
            controller.showOrders(controller.customers[1].id);

            // Assert
            expect(controller.onSelected).toHaveBeenCalled();
            expect(controller.onSelected).toHaveBeenCalledWith({ selectedCustomerId: controller.customers[1].id });
        });

    });

}