angular.module('indexpage',[])
    .controller('indexctrl', function($scope, $http) {
        $scope.getSearchResult = function() {
            $scope.placesArray =[];
            $scope.picsArray=[];
            $scope.reviews=[];
            $scope.weekdayHours=[];
            var placeId="";

            //console.log("testing");
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
                        var photoReference= results[j].photos[0].photo_reference;
                        placeId=results[j].place_id;

                        //console.log(photoReference);

                        $scope.addressHeader="Address :- ";
                        $scope.nameHeader="Place Name :- ";
                        //$scope.place_id=results[j].place_id;
                        $scope.ratingHeader="Rating :-";


                        var image="https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference="+photoReference+"&key=AIzaSyAk8FdCcWPekxegcpFkUAL5frrMc73F-4E";
                        //console.log(image);
                        $scope.picsArray.push(image);



                        var appendedstring= results[j].formatted_address+"***"+results[j].name+"###"+results[j].rating;
                        $scope.placesArray.push(appendedstring);

                        console.log($scope.placesArray);

                        $http.get("https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeId+"&key=AIzaSyAk8FdCcWPekxegcpFkUAL5frrMc73F-4E").then(function(placedata)
                        {
                            $scope.weekdayHours_week=[];
                            var documents=[];
                            if(placedata.data.result.reviews!= undefined)
                            {
                                for(var i=0;i<1;i++) {
                                    //console.log(placedata.data.result.reviews);

                                    $scope.reviewHeader = "Reviews";

                                    $scope.author_name_header = "Author Name :- ";
                                    $scope.reviewtime_header = "Time of review :- ";
                                    $scope.comment_header = "Comment :-";
                                    $scope.user_rating_header = "User Rating :- ";


                                    $scope.author_Name = placedata.data.result.reviews[i].author_name;
                                    $scope.reviewtime = placedata.data.result.reviews[i].relative_time_description;
                                    $scope.comment = placedata.data.result.reviews[i].text;
                                    $scope.user_rating = placedata.data.result.reviews[i].rating;


                                    documents.push($scope.author_Name + '@@' + $scope.reviewtime + '##' + $scope.comment + '$$'+$scope.user_rating);

                                }
                                for(var x=0;x<documents.length;x++) {
                                    $scope.reviews.push(documents[x]);
                                }


                                    $scope.weeklyhoursheader = "Weeekly Hours";
                                    for (var k = 0; k < 7; k++) {
                                            try {
                                                //console.log(placedata.data.result.opening_hours.weekday_text[k]);
                                                var weekday_timings = placedata.data.result.opening_hours.weekday_text[k];
                                                $scope.weekdayHours_week.push(weekday_timings);
                                            }
                                            catch (e) {
                                                switch (k) {
                                                    case 0:
                                                        $scope.weekdayHours_week.push("Monday:Closed");
                                                        break;
                                                    case 1:
                                                        $scope.weekdayHours_week.push("Tuesday:Closed");
                                                        break;
                                                    case 2:
                                                        $scope.weekdayHours_week.push("Wednesday:Closed");
                                                        break;
                                                    case 3:
                                                        $scope.weekdayHours_week.push("Thursday:Closed");
                                                        break;
                                                    case 4:
                                                        $scope.weekdayHours_week.push("Friday:Closed");
                                                        break;
                                                    case 5:
                                                        $scope.weekdayHours_week.push("Saturday:Closed");
                                                        break;
                                                    case 6:
                                                        $scope.weekdayHours_week.push("Sunday:Closed");
                                                        break;
                                                }
                                            }
                                    }
                                    $scope.weekdayHours.push($scope.weekdayHours_week);
                                    console.log($scope.weekdayHours);
                            }
                            else
                                {

                                }
                        })

                    }
                    //console.log($scope.placesArray );
                }
                catch(err){
                }
            })

        }
    });
