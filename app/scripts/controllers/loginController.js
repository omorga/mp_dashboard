(function () {
    'use strict';

    var LoginCtrl = ['$scope', '$rootScope', '$compile','$state','$http','hostFactory','userFactory', function ($scope, $rootScope, $compile,$state,$http,hostFactory,userFactory) {

        var ctrl = this;

        ctrl.username = "";

        ctrl.password = "";

        ctrl.login = loginFn;

        ctrl.invalidLogin = false;


        function loginFn() {
            if (ctrl.username === null || ctrl.username === undefined || ctrl.username===""){
                ctrl.invalidLogin = true;
                setTimeout(function () {
                    ctrl.invalidLogin = false;
                    $scope.$apply();
                },1000);
                return;
            }
            if (ctrl.password === null || ctrl.password === undefined || ctrl.password==="" || ctrl.password.length < 8){
                ctrl.invalidLogin = true;
                setTimeout(function () {
                    ctrl.invalidLogin = false;
                    $scope.$apply();
                },1000);
                return;
            }

            var data = {
                'username':ctrl.username,
                'password':ctrl.password
            };

            $http.post(hostFactory.getHost()+hostFactory.getLoginAPI(),data).then(function (response) {

                userFactory.setUser(response.data);

                if (response.data.role === 'admin') {

                    var menu = [
                        { label: "Catalogo Prodotti", state: "Catalogo Prodotti", icon: "fa fa-database" },
                        { label: "Gestione Personale", state: "Gestione Personale", icon: "fa fa-users" },
                        { label: "Gestione Politiche", state: "Gestione Politiche", icon: "fa fa-gears" },
                        { label: "Gestione Magazzini Periferici", state: "Gestione Magazzini Periferici", icon: "fa fa-gears" }

                    ];
                    userFactory.setMenu(menu);

                }

                if (response.data.role === 'magazziniere') {

                    var menu = [
                        { label: "Catalogo Prodotti", state: "Catalogo Prodotti", icon: "fa fa-database" },
                        { label: "Evasione Ordini", state: "Evasione Ordini", icon: "fa fa-users"}
                    ];
                    userFactory.setMenu(menu);

                }


                $state.go("Profilo Utente");

            }).catch(function (error) {
                ctrl.invalidLogin = true;
                setTimeout(function () {
                    ctrl.invalidLogin = false;
                    $scope.$apply();
                },1000);
            });




        }

    }];

    LoginCtrl.$inject = ['$scope', '$rootScope', '$compile','$state','$http','hostFactory','userFactory'];

    angular.module('mp-dashboard').controller('LoginCtrl', LoginCtrl);

}());
