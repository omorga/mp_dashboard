(function () {
    'use strict';

    var AccountCtrl = ['$scope', '$rootScope', '$compile','$state','$http','hostFactory','userFactory', function ($scope, $rootScope, $compile,$state,$http,hostFactory,userFactory) {

        var ctrl = this;
        ctrl.newPassword = "";
        ctrl.confirmPassword = "";
        ctrl.newQualification = "";
        ctrl.newNote = "";
        ctrl.invalidCredential = false;
        ctrl.user = userFactory.getUser();


        ctrl.modify = modifyFn;
        ctrl.reset = resetFn;
        ctrl.deleteQualification = deleteQualificationFn;
        ctrl.modifyAboutMe = modifyAboutMeFn;

        function modifyFn() {
            if (ctrl.newPassword === null || ctrl.newPassword === undefined || ctrl.username === "" ||
                ctrl.newPassword.length < 8 || ctrl.newPassword !== ctrl.confirmPassword) {
                ctrl.invalidCredential = true;
                setTimeout(function() {
                    ctrl.invalidCredential = false;
                    $scope.$apply();
                }, 1000);
                return;
            }

            ctrl.user.password = ctrl.newPassword;

            $http.put(hostFactory.getHost()+hostFactory.getUserAPI(), ctrl.user).then(function(response) {
                userFactory.setUser(response.data);

                $state.go("Profilo Utente");

            }).catch(function (error) {
                ctrl.invalidLogin = true;
                setTimeout(function () {
                    ctrl.invalidLogin = false;
                    $scope.$apply();
                },1000);
            });
        }

        function resetFn() {
            ctrl.newPassword = null;
            ctrl.confirmPassword = null;
        }

        function deleteQualificationFn(qual) {
            var index = ctrl.user.qualifications.indexOf(qual);
            ctrl.user.qualifications.splice(index, 1);
        }

        function modifyAboutMeFn() {
            if (ctrl.newQualification !== null && ctrl.newQualification !== undefined && ctrl.newQualification !== "") {
              ctrl.user.qualifications.push(ctrl.newQualification);
            }

            $http.post(hostFactory.getHost()+hostFactory.getUserAPI(), ctrl.user).then(function(response) {
              userFactory.setUser(response.data);

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

    AccountCtrl.$inject = ['$scope', '$rootScope', '$compile','$state','$http','hostFactory','userFactory'];

    angular.module('mp-dashboard').controller('AccountCtrl', AccountCtrl);
}());
