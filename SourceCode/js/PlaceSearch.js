angular.module('indexpage',[])
    .controller('indexctrl', function($scope, $http) {
        $scope.getSearchResult = function() {
            $scope.placesArray =[];
            $scope.picsArray=[];

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
            //console.log(interestValue);
            $http.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query="+$scope.searchDestination+"+point+of+interest"+interestValue+"&language=en&key=AIzaSyAk8FdCcWPekxegcpFkUAL5frrMc73F-4E").then(function(data)
            {
                $scope.listheader="Here are the places of the searched destination and priority";
                try {
                    console.log(data);
                    var results=data.data.results;

                    var length=data.data.results.length;

                    //console.log(length);
                    for(var j=0;j<length;j++)
                    {
                        //var photoReference= results[j].photos[0].photo_reference;
                        //console.log(photoReference);

                        $scope.addressHeader="Address :- ";
                        $scope.nameHeader="Place Name :- ";
                        $scope.place_id=results[j].place_id;
                        $scope.ratingHeader="Rating :-";


                        var image="https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference="+results[j].photos[0].photo_reference+"&key=AIzaSyAk8FdCcWPekxegcpFkUAL5frrMc73F-4E";
                        //console.log(image);
                        $scope.picsArray.push(image);

                        var appendedstring= results[j].formatted_address+"***"+results[j].name+"###"+results[j].rating;
                        $scope.placesArray.push(appendedstring);

                    }
                    //console.log($scope.placesArray );
                }
                catch(err){
                }
            })

        }
    });
