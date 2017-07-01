
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

        function setMenuFn() {
          userFactory.menu = [
            { label: "Catalogo Prodotti", state: "Catalogo Prodotti", icon: "fa fa-database" },
            { label: "Gestione Ordini", state:"Gestione Ordini", icon:"fa fa-file"},
            { label: "Evasione Ordini", state: "Evasione Ordini", icon: "fa fa-file-o"},
        ];
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
