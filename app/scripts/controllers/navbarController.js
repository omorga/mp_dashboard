/**
 * controller related to index.html
 * Contains data to show in this view
 */
(function () {
  'use strict';

    var NavbarCtrl = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http', 'userFactory', function ($scope, $rootScope, $compile, $state, $stateParams,$http, userFactory) {

        var ctrl = this;

        ctrl.collapsemenu = false;

        ctrl.openmenu = false;

        ctrl.state = $state;

        ctrl.switchmenu = switchmenuFn;

        ctrl.go = goFn;

        ctrl.user = null;

        ctrl.menulist = userFactory.menu;

        ctrl.signout = signoutFn;



        function goFn(location) {
            $state.go(location);
        }

        function switchmenuFn() {

            if (parseInt($(window).width()) > 752) {
                ctrl.collapsemenu = !ctrl.collapsemenu;

            } else {

                ctrl.openmenu = !ctrl.openmenu;
            }
        }

        function signoutFn() {
            if (ctrl.user != null) {
                ctrl.user = null;
            }

            ctrl.menulist = [];
            ctrl.go("Login");
        }


        var w = $(window).height();
        var mh = parseInt($('#header').css('height'));
        ctrl.minheight = w - mh;

    }];

    NavbarCtrl.$inject = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http', 'userFactory'];

    angular.module('mp-dashboard').controller('NavbarCtrl', NavbarCtrl);
} ());
