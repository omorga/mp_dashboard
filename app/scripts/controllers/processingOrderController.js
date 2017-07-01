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
            console.log(ctrl.checkReceived(entry.batches));
            if (entry.commission.destination == "FoodEmperors" && ctrl.checkReceived(entry.batches))
              ctrl.inCommissions.push(entry);
          }
          else
            ctrl.orderCompleted++;
        });
        console.log(ctrl.inCommissions)
      }).catch(function (error) {
        console.log(error);
      });
    }

    ctrl.getAllCommission();

    ctrl.checkReceived = function(batches)
    {
       // batches.forEach(function (entry) {
       //   if (entry.delDate)
       //       return true;
      //});
        for (var i = 0 ; i < batches.length ; i++){
            if (batches[i].delDate)
                return true;
        }

      return false;
    }

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

        ctrl.appBatch= JSON.parse(JSON.stringify(batch));
        ctrl.appBatch.status = 2;
        ctrl.appBatch.remaining = batch.quantity;
        ctrl.appBatch.delDate = ctrl.currentDate();
        ctrl.deliveredProducts.push(ctrl.appBatch);
      }
      else {
        ctrl.idx = ctrl.deliveredProducts.indexOf(batch);
        ctrl.deliveredProducts.splice(ctrl.idx, 1);
      }
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

    ctrl.confirmDeliveredProduct = function () {

      $http.post(hostFactory.getHost() + hostFactory.postBatchAPI(), ctrl.deliveredProducts).then(function (response) {

        ctrl.showOrderFn(response.data);


      }).catch(function (error) {
        console.log(error);
      });

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
