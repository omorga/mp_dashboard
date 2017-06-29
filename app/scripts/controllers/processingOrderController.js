(function () {
  'use strict';

  var procOrdCtrl = ['$scope', '$rootScope', '$compile', '$http', '$state', 'hostFactory', function ($scope, $rootScope, $compile, $http, $state, hostFactory) {

    var ctrl = this;
    console.log("processingOrderctrl");

    /**
     * Funzione principale che prende tutti gli ordini dal backend
     */
    ctrl.getAllCommission = function () {
      $http.get(hostFactory.getHost() + hostFactory.getCommissionAPI()).then(function (response) {
        ctrl.inCommissions = [];
        ctrl.orderCompleted = 0;
        ctrl.commissions = response.data;
        ctrl.commissions.forEach(function (entry) {
          if (!entry.commission.completed) {
            if (entry.commission.destination == "FoodEmperors")
              ctrl.inCommissions.push(entry);
          }
          else
            ctrl.orderCompleted++;
        });
      }).catch(function (error) {
        console.log(error);
      });
    }

    ctrl.getAllCommission();

    /**
     * Serve a mostrare la tabella con la gestione dell'ordine, se è nullo mostra la lista degli ordini totali disponibili
     * @param order l'ordine da mostrare
     */
    ctrl.showOrderFn = function (order) {
    ctrl.deliveredProducts = [];
    ctrl.selectedBatches = [];
    if (order == null) {
       ctrl.showOrder = null;
       // window.location.reload(true);
       ctrl.getAllCommission();
     } else {
       ctrl.showOrder = order;
       console.log(ctrl.showOrder);
       var i;
       for (i = 0; i < order.batches.length; i++)
         ctrl.selectedBatches[i] = 0;
      }
    }

    /**
     * serve a far mostrare alla modal la descrizione dell'articolo
     * @param product
     */
    ctrl.showProductFn = function (product) {
      ctrl.showProduct = product;
    }

    /**
     * permette di arrivare allo stato di storico, per mostrare lo storico ordini
     */
    ctrl.showHistory = function () {
      $state.go("Storico");
    }

    /**
     * serve a far mostrare alla modal la segnalazione del prodotto
     * @param product
     */
    ctrl.signalProductFn = function (product) {
      ctrl.signalProduct = product;
    }

    /**
     *  Quando si clicca sulla checkbox, se il click è positivo inserisce il batch nella lista dei batch da modificare,
     *  se è negativo, lo elimina dalla lista
     *
     * @param batch
     * @param status
     */
    ctrl.toggle = function (batch, status) {
      if (status) {
        batch.status = 2;
        ctrl.deliveredProducts.push(batch);
      }
      else {
        ctrl.idx = ctrl.deliveredProducts.indexOf(batch);
        ctrl.deliveredProducts.splice(ctrl.idx, 1);
      }
      console.log(ctrl.deliveredProducts);
    }

    ctrl.checkSignaled = [];
    /**
     *  Quando si clicca sulla checkbox, se il click è positivo inserisce il batch nella lista dei batch da modificare,
     *  se è negativo, lo elimina dalla lista
     *
     * @param batch
     * @param status
     */
    ctrl.signalToggle = function (info) {
      var idx = ctrl.checkSignaled.indexOf(info);
      if (idx > -1) {
        ctrl.checkSignaled.splice(idx, 1);
      }
      else {
        ctrl.checkSignaled.push(info);
      }
    }

    /**
     * TODO: caso d'uso "SEGNALAZIONE PRODOTTO"
     *
     *
     */
    ctrl.sendSignaledProduct = function () {
      console.log(ctrl.checkSignaled);
      console.log(ctrl.textSignaled);
    }

    ctrl.currentDate = function () {
      var currentTime = new Date();
      var month = currentTime.getMonth() + 1;
      var day = currentTime.getDate();
      var year = currentTime.getFullYear();
      return (day + "/" + month + "/" + year);
    }
  }];

  procOrdCtrl.$inject = ['$scope', '$rootScope', '$compile', '$http', '$state', 'hostFactory'];
  angular.module('mp-dashboard').controller('procOrdCtrl', procOrdCtrl);

}());
