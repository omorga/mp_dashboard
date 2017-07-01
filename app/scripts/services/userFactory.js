
(function() {
    'use strict';
    angular.module('mp-dashboard').factory('userFactory', userFactory);

    function userFactory() {
        var userFactory = {};


        userFactory.menu =  [{ label: "Catalogo Prodotti", state: "Catalogo Prodotti", icon: "fa fa-database" },
            { label: "Gestione Ordini", state:"Gestione Ordini", icon:"fa fa-file"},
            { label: "Evasione Ordini", state: "Evasione Ordini", icon: "fa fa-file-o"}];


        return userFactory;
    }


}());
