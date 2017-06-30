(function () {
    'use strict';

    var CatalogCtrl = ['$scope', '$rootScope', '$compile','$http','hostFactory', function ($scope, $rootScope, $compile,$http,hostFactory) {

      var ctrl = this;

      ctrl.clicked = false;

      ctrl.mode = null;

      ctrl.selected = null;

      ctrl.backupBatches = [];

      ctrl.modify = null;

      ctrl.success = false;

      ctrl.error = false;

      ctrl.despBatches = null;

      ctrl.categories = [];

      ctrl.searchText = "";

      ctrl.searchFilter = searchBatchFilter;

      ctrl.searchCategoryFilter=searchBatchCategoryFilter;

      loadCategories();


      loadCatalogue();

      function loadCatalogue() {
        $http.get(hostFactory.getHost() + hostFactory.getCatalogueBatchesAPI()).then(function (response) {
          ctrl.despBatches = response.data;
          ctrl.despBatches.orderByField = 'Prodotto';
          ctrl.despBatches.reverseSort = false;
        }).catch(function (error) {
          console.log(error);
        });
      }

      function loadCategories() {
        $http.get(hostFactory.getHost() + hostFactory.getLeafCategoriesAPI()).then(function (response) {
          ctrl.categories = response.data;
        }).catch(function (error) {
          console.log(error);
        });
      }

      function searchBatchCategoryFilter(item) {
        if (angular.isDefined(ctrl.category) && ctrl.category.length > 0) {
          if (item.product.category.id.toLowerCase().indexOf(ctrl.category.toLowerCase()) !== -1) {
            return true;
          }else if(item.product.category.fatherId.toLowerCase().indexOf(ctrl.category.toLowerCase()) !== -1){
            return true;
          }
          else{
            return false;
          }
        }return true;
      }

        function searchBatchFilter(item) {
         if (ctrl.searchText && ctrl.searchText !== ''){
          for (var i = 0; i < ctrl.searchText.length; i++) {
              if (item.product.description.toLowerCase().indexOf(ctrl.searchText.toLowerCase()) !== -1) {
                return true;
              }
              else if (item.product.name.toLowerCase().indexOf(ctrl.searchText.toLowerCase()) !== -1) {
                return true;
              }
              else if (item.product.stockist.toLowerCase().indexOf(ctrl.searchText.toLowerCase()) !== -1) {
                return true;
              }
              else  {
                return false;
              }
            }
        } else {
          return true;
        }
      }

    }];

  CatalogCtrl.$inject = ['$scope', '$rootScope', '$compile','$http','hostFactory'];

  angular.module('mp-dashboard').controller('CatalogCtrl', CatalogCtrl);

}());
