/**
 * Created by purushotham on 22/3/17.
 */
(function() {
    'use strict';
    angular.module("MSC.home")
        .component('homeComponent',{
            templateUrl : "app/partials/listOfCourses.html",
            controller : homeController,
            controllerAs : "hmc",
            bindings :{
                available: "="
            }
        });
    homeController.$inject=['$uibModal','NgTableParams','courseService','$filter','$localStorage','$state'];
    function homeController(uibModal,NgTableParams,courseService,$filter,$localStorage,$state) {
        var vm = this;
        vm.$onInit = function () {
            loadTable();
            function loadTable() {
                vm.tableParams = new NgTableParams({
                    page:1,
                    count: 2

                },{
                    counts : [2,5,10,25,50,100],
                    getData: function (params) {
                        var query={
                            page_size : params.count()=== -1 ? 0 : params.count(),
                            page : (params.page()-1) * params.count(),
                            sortingCriteria : params.sorting()
                        };
                        return courseService.getCourses(query).then(function (response) {
                            vm.userTable = response.data;
                            vm.courses=checkAvailableSeats(vm.userTable);
                            $localStorage.courseDetails=[];
                            for (var i = 0; i < response.data.length; i++) {
                                $localStorage.courseDetails.push(response.data[i])
                            }
                            params.total(response.pagination.total);
                            var filterObj = params.filter(),filteredData = $filter('filter')(vm.courses, filterObj);
                            var sortObj = params.sorting(), orderedData = $filter('orderBy')(filteredData, filterObj);
                            var data= orderedData;
                            return data;
                        });
                    }

                });
            }
            function checkAvailableSeats(courses){
                for(var i = 0;i< courses.length;i++){
                    var eachCourse = courses[i];
                    eachCourse.availableSeats = 0;
                    for(var j=0;j<eachCourse.courseSlot.length;j++){
                        eachCourse.availableSeats = eachCourse.availableSeats + eachCourse.courseSlot[j].availableSlots;
                    }
                }
                return courses;
            }
            vm.addCourses=function(){
                var modalInstance = uibModal.open({
                    animation: vm.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/partials/course.html',
                    controller: 'courseCtrl',
                    controllerAs: 'tc'
                });
                modalInstance.result.then(function () {
                    loadTable();
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        }
    };
}());