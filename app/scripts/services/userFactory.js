
(function() {
    'use strict';
    angular.module('mp-dashboard').factory('userFactory', userFactory);

    function userFactory() {
        var userFactory = {};

        userFactory.user = null;

        userFactory.setUser = setUserFn;

        userFactory.getUser = getUserFn;

        userFactory.setMenu = setMenuFn;

        userFactory.getMenu = getMenuFn;

        userFactory.menu = null;

        function getMenuFn() {
            return userFactory.menu;
        }

        function setMenuFn(menu) {
            if (menu!==null && menu!==undefined){
                userFactory.menu = menu;
            }
        }


        function getUserFn() {
            return userFactory.user;
        }

        function setUserFn(user) {
            if (user!==null && user!==undefined){
                userFactory.user = user;
            }
        }

        return userFactory;
    }


}());
