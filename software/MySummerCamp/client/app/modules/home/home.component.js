/**
 * Created by purushotham on 22/3/17.
 */
(function() {
    'use strict';
    angular.module("MSC.home")
        .component('homeComponent',{
            templateUrl : "app/partials/listOfCourses.html",
            controller : homeController,
            controllerAs : "hmc"
        });
    homeController.$inject=['$uibModal'];
    function homeController(uibModal) {
        var vm = this;
        vm.$onInit = function () {
            console.log("in home component");
            function loadTable() {
                vm.tableParams = new NgTableParams({
                    page:1,
                    count: 3

                },{

                    counts : [2,5,10,25,50,100],
                    getData: function (params) {
                        var query={
                            page_size : params.count()=== -1 ? 0 : params.count(),
                            page : (params.page()-1) * params.count(),
                            id : vm.id ,
                            sortingCriteria : params.sorting()
                        }
                        return courseService.getCourses(query).then(function (response) {
                            /*//params.total(data.inlineCount); // recal. page nav controls*/
                            vm.userTable = response.data;
                            if(response.status == "ok"){
                                vm.message=response.messages;}
                            params.total(response.pagination.total);
                            var filterObj = params.filter(),filteredData = $filter('filter')(vm.userTable, filterObj);
                            var sortObj = params.sorting(), orderedData = $filter('orderBy')(filteredData, filterObj);
                            var data= orderedData;
                            return data;
                        });
                    }

                });
            }
            vm.addCourses=function(){
                console.log("in add ")
                var modalInstance = uibModal.open({
                    animation: vm.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/partials/course.html',
                     controller: 'courseCtrl',
                     controllerAs: 'tc'
                });
                modalInstance.result.then(function () {

                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        }
    };
}());