/**
 * Created by simone on 29/06/17.
 */

(function () {
    'use strict';

    var HistoryCtrl = ['$scope', '$rootScope', '$compile', '$http', 'hostFactory', function ($scope, $rootScope, $compile, $http, hostFactory) {

        var ctrl = this;

        ctrl.inCommissions = [];

        ctrl.showOrder = null;

        $http.get(hostFactory.getHost() + hostFactory.getCommissionAPI()).then(function (response) {

            ctrl.commissions = response.data;
            console.log(ctrl.commissions);

            ctrl.commissions.forEach(function (entry) {

                if (entry.commission.completed) {
                    if (entry.commission.destination == "FoodEmperors")
                        ctrl.inCommissions.push(entry);
                }
                ctrl.showOrder = null;
            });
        }).catch(function (error) {
            console.log(error);
        });

        ctrl.showOrderFn = function (order) {
            if (order == null) {
                ctrl.showOrder = null;
            } else {
                ctrl.showOrder = order;
            }
        }

    }];

    HistoryCtrl.$inject = ['$scope', '$rootScope', '$compile', '$http', 'hostFactory'];

    angular.module('mp-dashboard').controller('HistoryCtrl', HistoryCtrl);

}());
