angular.module('indexpage',[])
    .controller('indexctrl', function($scope, $http) {
        $scope.getSearchResult = function() {
            console.log($scope.searchDestination);
            var interestValue=(document.getElementById("interest").value).toLowerCase();
            if(interestValue=="select")
            {
                interestValue="";
            }
            else
            {
                interestValue ="&type="+(document.getElementById("interest").value).toLowerCase();
            }
            console.log(interestValue);
            $http.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query="+$scope.searchDestination+"+point+of+interest"+interestValue+"&language=en&key=AIzaSyAk8FdCcWPekxegcpFkUAL5frrMc73F-4E").then(function(data)
            {
                //alert("success triggered");
                try {
                    console.log(data);

                }
                catch(err){
                }
            })
        }
    });
