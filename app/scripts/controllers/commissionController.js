
(function () {
    'use strict';

    var CommissionCtrl = ['$scope', '$rootScope', '$compile','$http','hostFactory', function ($scope, $rootScope, $compile,$http,hostFactory) {

        var ctrl = this;

        ctrl.commissions = null;

        ctrl.clicked = false;

        ctrl.searchText = "";

        ctrl.mode = null;

        ctrl.selected = null;

        ctrl.searchFilter = searchFilterFn;

        ctrl.switchMode = switchModeFn;

        ctrl.select = selectFn;

        ctrl.deleteCommission = deleteCommissionFn;

        ctrl.selectBatch = selectBatchFn;

        ctrl.addBatch = addBatchFn;

        ctrl.deleteBatch = deleteBatchFn;

        ctrl.saveCommission = saveCommissionFn;

        ctrl.updateCommission = updateCommissionFn;

        ctrl.getProducts = getProductsFn;

        ctrl.backupProducts = [];

        ctrl.description = "";

        ctrl.batchSize = 100;

        ctrl.quantities = [];

        ctrl.modify = null;

        ctrl.categories = [];

        loadCategories();

        for (var i= 0 ;i < 10 ; i++){
            ctrl.quantities.push((i+1)*ctrl.batchSize);
        }

        ctrl.success = false;

        ctrl.error = false;

        ctrl.selectedBatch = {
            quantity:ctrl.quantities[0],
            product : null
        };

        ctrl.externalSuppliers = [];

        ctrl.newOrder = {
            source:"FoodEmperors",
            date:"",
            batches:[],
            completed : false,
            destination: ctrl.externalSuppliers[0]
        };

        loadCommissions();

        loadExternalSuppliers();

        function loadExternalSuppliers() {
            $http.get(hostFactory.getHost()+hostFactory.getExternalSuppliersAPI()).then(function (response) {
                ctrl.externalSuppliers = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        }

        function getProductsFn(search) {

            if (ctrl.description.length > search.length)
                ctrl.products =  JSON.parse(JSON.stringify(ctrl.backupProducts));
            ctrl.description = search;
            if (angular.isDefined(ctrl.category) && ctrl.category!== null && ctrl.category.length > 0 ){
                if (search!==null && search!==undefined && search.length==3){
                    var param = ctrl.category + " - " + search;
                    $http.get(hostFactory.getHost()+hostFactory.getFindProductByCategoryAndPropertiesAPI(param)).then(function (res) {
                        ctrl.products = JSON.parse(JSON.stringify(res.data));
                        ctrl.backupProducts =  JSON.parse(JSON.stringify(ctrl.products));
                    }).catch(function (error) {
                        console.log(error);
                        ctrl.products = [];
                    });
                }
                else if (search!==null && search!==undefined && search.length<3)
                    ctrl.products=[];
            }
            else
                return;

        }

        function saveCommissionFn() {
            var batches = JSON.parse(JSON.stringify(ctrl.newOrder.batches));
            if (batches.length === 0){
                ctrl.error = true;
                setTimeout(function () {
                    ctrl.error = false;
                    $scope.$apply();
                },1500);
                return;
            }
            var order = JSON.parse(JSON.stringify(ctrl.newOrder));
            delete order.batches;
            var data = {
                "batches":batches,
                "commission":order
            };
            /**
             * set deliverydate and
             * @type {Date}
             */
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd='0'+dd;
            }
            if(mm<10) {
                mm='0'+mm;
            }
            today = dd+'/'+mm+'/'+yyyy;
            data.commission.date = today;
            data.commission.number = dd+mm+yyyy;
            for (var i = 0 ; i < data.batches.length ; i++){
                data.batches[i].price = data.batches[i].number*data.batches[i].quantity*data.batches[i].product.price;
                data.batches[i].status = 0;
            }
            $http.post(hostFactory.getHost()+hostFactory.getSaveDeleteUpdateCommissionAPI(),data).then(function (response) {
                loadCommissions();
                ctrl.success = true;
                setTimeout(function () {
                    ctrl.success = false;
                    ctrl.switchMode(null);
                    $scope.$apply();
                },1500);

            }).catch(function (error) {
                console.log(error);
                ctrl.error = true;
                setTimeout(function () {
                    ctrl.error = false;
                    $scope.$apply();
                },1500);
            });
        }

        function updateCommissionFn() {
            var batches = JSON.parse(JSON.stringify(ctrl.selected.batches));
            if (batches.length === 0){
                ctrl.error = true;
                setTimeout(function () {
                    ctrl.error = false;
                    $scope.$apply();
                },1500);
                return;
            }
            var order = JSON.parse(JSON.stringify(ctrl.selected.commission));
            delete order.batches;
            var data = {
                "batches":batches,
                "commission":order
            };
            for (var i = 0 ; i < data.batches.length ; i++){
                data.batches[i].price = data.batches[i].number*data.batches[i].quantity*data.batches[i].product.price;
            }
            $http.put(hostFactory.getHost()+hostFactory.getSaveDeleteUpdateCommissionAPI(),data).then(function (response) {
                loadCommissions();
                ctrl.success = true;
                setTimeout(function () {
                    ctrl.success = false;
                    ctrl.switchMode(null);
                    $scope.$apply();
                },1500);

            }).catch(function (error) {
                console.log(error);
                ctrl.error = true;
                setTimeout(function () {
                    ctrl.error = false;
                    $scope.$apply();
                },1500);
            });
        }

        function addBatchFn(commission) {

            ctrl.modify = false;
            ctrl.category = null;
            var add = true;
            var index = 0;
            for (var i = 0 ; i < commission.batches.length ; i++ ){
                add = !(commission.batches[i].product.name === ctrl.selectedBatch.product.name &&
                commission.batches[i].product.stockist === ctrl.selectedBatch.product.stockist);
                if (!add){
                    index = i;
                    break;
                }
            }
            if (add){
                commission.batches.push(ctrl.selectedBatch);
                ctrl.selectedBatch = {
                    quantity:ctrl.quantities[0],
                    product:null
                };
            }else{
                commission.batches[i].quantity = ctrl.selectedBatch.quantity;
                ctrl.selectedBatch = {
                    quantity:ctrl.quantities[0],
                    product:null
                };
            }

        }

        function deleteBatchFn(index,commission) {
            commission.batches.splice(index,1);
        }

        function selectBatchFn(batch) {
            ctrl.modify = true;
            ctrl.selectedBatch = batch;
            for (var i = 0 ; i < ctrl.products.length ; i++){
                if (ctrl.products[i].name === ctrl.selectedBatch.product.name &&
                    ctrl.products[i].stockist === ctrl.selectedBatch.product.stockist){
                    ctrl.selectedBatch.product = ctrl.products[i];
                }
            }
        }

        function deleteCommissionFn() {
            $http.delete(hostFactory.getHost()+hostFactory.getSaveDeleteUpdateCommissionAPI()+'/' + ctrl.selected.commission.id).then(function (response) {
                ctrl.success = true;
                loadCommissions();
                setTimeout(function () {
                    ctrl.success = false;
                    ctrl.switchMode(null);
                    $scope.$apply();
                },1000);
            }).catch(function (error) {
                console.log(error);
                ctrl.error = true;
                setTimeout(function () {
                    ctrl.error = false;
                    ctrl.switchMode(null);
                    $scope.$apply();
                },1000);
            });
        }

        function selectFn(commission) {
            ctrl.clicked = true;
            if (ctrl.selected === commission){
                ctrl.selected = null;
            }
            else if (ctrl.selected === null){
                ctrl.selected = commission;
            }
            else{
                ctrl.selected = commission;
            }

        }


        function switchModeFn(mode) {

            ctrl.mode = mode;
            ctrl.modify = false;
            if (!ctrl.mode){
                loadCommissions();
                ctrl.selected = null;
                ctrl.newOrder = {
                    source:"FoodEmperors",
                    date:"",
                    batches:[],
                    destination: ctrl.externalSuppliers[0]
                };
                ctrl.selectedBatch = {
                    quantity:ctrl.quantities[0],
                    product : null
                };
            }
        }

        function searchFilterFn(item) {

            if (ctrl.searchText && ctrl.searchText !== '') {
                if (item.commission.number.toString().toLowerCase().indexOf(ctrl.searchText.toLowerCase()) !== -1) {
                    return true;
                }
                else if (item.commission.source.toLowerCase().indexOf(ctrl.searchText.toLowerCase()) !== -1) {
                    return true;
                }
                else if(item.commission.destination.toLowerCase().indexOf(ctrl.searchText.toLowerCase()) !== -1){
                    return true;
                }
                else {
                    return false;
                }
            }else{
                return true;
            }
        }

        function loadCommissions() {
            $http.get(hostFactory.getHost()+hostFactory.getAllCommissionsAPI()).then(function (response) {
                ctrl.commissions = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        }

        function loadCategories() {
            $http.get(hostFactory.getHost()+hostFactory.getLeafCategoriesAPI()).then(function (response) {
                ctrl.categories = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        }



    }];

    CommissionCtrl.$inject = ['$scope', '$rootScope', '$compile','$http','hostFactory'];

    angular.module('mp-dashboard').controller('CommissionCtrl', CommissionCtrl);

}());
