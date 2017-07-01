/**
 * Created by morga on 29/06/2017.
 */
(function () {
  'use strict';
  angular.module('mp-dashboard').factory('hostCentralFactory', hostCentralFactory);

  function hostCentralFactory() {
    var hostCentralFactory = {};

    hostCentralFactory.host = "http://160.80.134.103:8080/";

    hostCentralFactory.allProductsAPI = "api/pos/products";

    hostCentralFactory.saveDeleteUpdateCommissionAPI = "api/commission";

    hostCentralFactory.findProductByPropertiesAPI = "api/product/findby/category/properties";

    hostCentralFactory.leafCategories = "api/pos/categories/leaf";

    hostCentralFactory.productAPI = "api/product";

    hostCentralFactory.commissionAPI = "/api/commissions";

    hostCentralFactory.getHost = getHostFn;

    hostCentralFactory.getCommissionAPI = getCommissionAPIFn;

    hostCentralFactory.getAllProductsAPI = getAllProductsAPIFn;

    hostCentralFactory.getFindProductByCategoryAndPropertiesAPI = getFindProductByCategoryAndPropertiesAPIFn;

    hostCentralFactory.getLeafCategoriesAPI = getLeafCategoriesAPIFn;

    hostCentralFactory.getProductAPI = getProductAPIFn;

    function getCommissionAPIFn() {
      return hostCentralFactory.commissionAPI;
    }

    function getProductAPIFn() {
      return hostCentralFactory.productAPI;
    }

    function getLeafCategoriesAPIFn() {
      return hostCentralFactory.leafCategories;
    }

    function getFindProductByCategoryAndPropertiesAPIFn(properties) {
      return hostCentralFactory.findProductByPropertiesAPI + '/' + properties;
    }

    function getSaveDeleteUpdateCommissionAPIFn() {
      return hostCentralFactory.saveDeleteUpdateCommissionAPI;
    }

      function getAllProductsAPIFn() {
      return hostCentralFactory.allProductsAPI;
    }

    function getHostFn() {
      return hostCentralFactory.host;
    }

    return hostCentralFactory;
  }

}());
