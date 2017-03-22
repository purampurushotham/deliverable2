/**
 * Created by purushotham on 22/3/17.
 */
/**
 * Created by purushotham on 2/3/17.
 */
angular
    .module("MSC")
    .factory("slotData",slotData);
slotData.$inject=['$http','$q'];
function slotData($http,$q) {

    return {
        getData:function () {
            var products=[];
            var deffered=$q.defer();
            $http.get('../../data.json').then(function mySuccess(response) {
                console.log(response.data)
                    deffered.resolve(response.data);
            }).then(function myError(error) {
                deffered.reject("error in getting data");
            });
            return deffered.promise;
        }
    };
}