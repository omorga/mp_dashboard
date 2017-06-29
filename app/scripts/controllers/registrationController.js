(function () {
    'use strict';

    var RegistrationCtrl = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http','hostFactory', function ($scope, $rootScope, $compile, $state, $stateParams,$http, hostFactory) {

        var ctrl = this;
        ctrl.user = {};
        ctrl.user.name = null;
        ctrl.user.surname = null;
        ctrl.user.username = null;
        ctrl.user.role = null;
        ctrl.user.password = null;
        ctrl.invalidRegistration = false;

        ctrl.registration = registrationFn;

        function registrationFn() {
            if (ctrl.user.name === null || ctrl.user.name === "" || ctrl.user.name === undefined) {
                ctrl.invalidRegistration = true;
                setTimeout(function () {
                    ctrl.invalidRegistration = false;
                    $scope.apply();
                }, 1000);
                return;
            }

            if (ctrl.user.surname === null || ctrl.user.surname === "" || ctrl.user.surname === undefined) {
                ctrl.invalidRegistration = true;
                setTimeout(function () {
                    ctrl.invalidRegistration = false;
                    $scope.apply();
                }, 1000);
                return;
            }

            if (ctrl.user.username === null || ctrl.user.username === "" || ctrl.user.username === undefined) {
                ctrl.invalidRegistration = true;
                setTimeout(function () {
                    ctrl.invalidRegistration = false;
                    $scope.apply();
                }, 1000);
                return;
            }

            if (ctrl.user.role === null || ctrl.user.role === "" || ctrl.user.role === undefined) {
                ctrl.invalidRegistration = true;
                setTimeout(function () {
                    ctrl.invalidRegistration = false;
                    $scope.apply();
                }, 1000);
                return;
            }

            if (ctrl.user.password === null || ctrl.user.password === "" || ctrl.user.password === undefined) {
                ctrl.invalidRegistration = true;
                setTimeout(function () {
                    ctrl.invalidRegistration = false;
                    $scope.apply();
                }, 1000);
                return;
            }

            $http.post(hostFactory.getHost()+hostFactory.getUserAPI(), ctrl.user).then(function (response) {
                $state.go("Home");
            }).catch(function(error){
                ctrl.invalidRegistration = true;
                setTimeout(function () {
                    ctrl.invalidRegistration = false;
                    $scope.$apply();
                },1000);
            });
        }

    }];



    RegistrationCtrl.$inject = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http','hostFactory'];

    angular.module('mp-dashboard').controller('RegistrationCtrl', RegistrationCtrl);

}());

