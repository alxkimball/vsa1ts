
module orders.tests {
    'use strict';

//    window["ReSharperReporter"].prototype.jasmineDone = () => { };
    

    describe('Orders controller tests', () => {

        // local vars
        var orderList: models.IOrderModel[] = [];
        var orderServiceMock: services.IOrderService;


        var $q: angular.IQService;
        var deferred: angular.IDeferred<{}>;
        var rootScope: ng.IRootScopeService;
        var controller: orders.IOrdersController;

        var $scope;

        


        //Arrange
        beforeEach(() => {

            (angular as any).mock.module('orders');

            // create mocks
            orderServiceMock = {
                getOrders: () => {
                    return $q.defer().promise;
                },
                getOrderDetail: () => {
                    return $q.defer().promise;
                }
            }

            // Setup any test data or call common routine

            inject(($controller, _$rootScope_, _$q_) => {
                $q = _$q_;
                rootScope = _$rootScope_;
                $scope = _$rootScope_.$new();
                deferred = $q.defer();

                var bindings = {
                    customerId: 'ALFKI'
                };


                // Setup spies

                // instantiate controller (or componentController
                controller = $controller('OrdersController',{OrderService: orderServiceMock}, bindings);
                controller.$onInit();     // need to call manually in test, in practice it fires automatically
            });

        });

        //TEST
        it('Controller is instantiated', () => {

            //Assert
            expect(controller).toBeDefined();
            expect(controller).not.toBeNull();

        });

        it('$onChanges calls loadOrders when customerId changes', () => {

            // spy to make sure method is called after changes
            spyOn(controller, 'loadOrders');

            // Act
            var changesObj = {
                customerId: {
                    currentValue: 'BOOGER'    // pass in an updated customerId
                }
            };
            controller.$onChanges(changesObj);

            //Assert
            expect(controller.loadOrders).toHaveBeenCalledWith('BOOGER');
        });

        it('$onChanges does not call loadOrders when customerId doesn\'t change', () => {

            // spy to make sure method is called after changes
            spyOn(controller, 'loadOrders');

            // Act
            var changesObj = {}

            controller.$onChanges(changesObj);

            //Assert
            expect(controller.loadOrders).not.toHaveBeenCalledWith('BOOGER');
        });


    });
}