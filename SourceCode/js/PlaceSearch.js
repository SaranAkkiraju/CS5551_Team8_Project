angular.module('indexpage',[])
    .controller('indexctrl', function($scope, $http,$window) {

        var url=window.location.href;
        var userName=(url.substring(url.indexOf("?")+1,url.length)).replace("%20"," ");
        var search_keyword="";
        console.log("It is angular !!!!!!!!!!!"+userName);
        console.log("It is angular !!!!!!!!!!!"+userName.indexOf("place"));
        if(userName.indexOf("place")==0) {
            console.log("angular i am here");
            $scope.searchDestination=(url.substr(50,url.indexOf("&&")-50)).replace("%20"," ");
            // $scope.searchDestination=(url.substr(50,url.indexOf("&&")-50)).replace("%20"," ");
        }
        // else {
        //     document.getElementById("userDetails").textContent = "";
        //     console.log("i am here");
        //     document.getElementById("searchDestination").value ="aaaaaaaaa" ;
        // }


        $scope.viewDirections = function() {
            $window.location.href = 'directions.html?'+$scope.searchDestination+'&&'+(document.getElementById("interest").value).toLowerCase();
        };


        $scope.getSearchResult = function() {
            $scope.placesArray =[];
            $scope.reviews=[];
            $scope.placeRatings=[];
            $scope.weekdayHours=[];
            $scope.placeids=[];
            $scope.placeNames=[];
            $scope.searchDescription=[];

            //Getting the interest field value if the user doesn't select anything no interest is passed to the api request.
            var value=(document.getElementById("interest").value).toLowerCase();


            var alpha= new RegExp('.*\\d.*');
            if ((alpha.test($scope.searchDestination)) && ($scope.searchDestination)) { // not email
                $scope.finalErr = '              Numbers are not allowed in Destination';
            }
            else
            {
                $scope.finalErr = '';
            }

            //Here the code is written to get the places of particular destination with.without interest.
            //From the output of url request we take the placeid,name,address and rating
            //we will do the places sort on basis of rating
            search_keyword=$scope.searchDestination+"***"+(document.getElementById("interest").value).toLowerCase();
            $http.get('http://127.0.0.1:8081/getPlaces?searchkey='+search_keyword).then(function(data)
            //$http.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query="+$scope.searchDestination+"+point+of+interest"+interestValue+"&language=en&key=AIzaSyAk8FdCcWPekxegcpFkUAL5frrMc73F-4E").then(function(data)
            {
                var photoReference='';
                if(data.data!=null) {
                    $scope.listheader = "Here are the places of the searched destination and priority";
                    // try {
                        var results = data.data.results.sort((a, b) => a.rating - b.rating);

                        var length = data.data.results.length;

                        for (var j = length - 1; j >=0; j--) {
                            if(results[j].photos !=null) {
                                 photoReference = results[j].photos[0].photo_reference;
                            }
                            else
                            {
                                photoReference="";
                            }

                            $scope.addressHeader = "Address :- ";
                            $scope.nameHeader = "Place Name :- ";
                            $scope.ratingHeader = "Rating :-";
                            $scope.description = "Description :-";

                            $scope.placeids.push(results[j].rating + "###" + results[j].place_id);

                            // var image=$http.get('http://127.0.0.1:8081/getImage?searchkey='+photoReference).then(function(imagedata)
                            // {
                            //     return imagedata;
                            // });

                            var image = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=" + photoReference + "&key=AIzaSyAk8FdCcWPekxegcpFkUAL5frrMc73F-4E";
                            $scope.placeRatings.push(results[j].rating);

                            var appendedstring = results[j].rating + "###" + results[j].formatted_address + "***" + results[j].name + "^^^" + image;
                            $scope.placesArray.push(appendedstring);
                            $scope.placeNames.push(results[j].name);
                        }

                        //$scope.placesArray.sort();
                    // }
                    // catch (err) {
                    //     console.log("error..................");
                    // }
                }
            })



            //Here we are requesting for a particular place details with the help of place id's
            //First we are going to sort the place ids
            //since requests can take time in above function so kept a waiting time to this logic
            //After getting the output we will get the the following fields i.e reviews and weekly hours
            setTimeout(function ()
            {
                try{
                    for( var z=$scope.placeids.length -1;z>=0;z--)
                    {
                        var placeId=$scope.placeids[z].substring($scope.placeids[z].indexOf("###")+3,$scope.placeids[z].length);
                        var place_Name=$scope.placeNames[z];
                        //console.log(place_Name);

                        $http.get('http://127.0.0.1:8081/getDescription?searchkey='+place_Name).then(function(descriptiondata)
                        //$http.get("https://kgsearch.googleapis.com/v1/entities:search?query="+place_Name+"&key=AIzaSyCZbMz2VUDfsNIawl7W9W64FpZp8gsoh10&limit=1&indent=True").success(function(descriptiondata)
                        {
                            try {
                                console.log(descriptiondata);

                                var description=descriptiondata.data.itemListElement[0].result.detailedDescription.articleBody;
                                $scope.searchDescription.push(description);
                                //console.log($scope.searchDescription);
                            }
                            catch(err){
                            }
                        })

                        $http.get('http://127.0.0.1:8081/getPlaceData?searchkey='+placeId).then(function(placedata)
                        //$http.get("https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeId+"&key=AIzaSyAk8FdCcWPekxegcpFkUAL5frrMc73F-4E").then(function(placedata)
                        {
                            $scope.weekdayHours_week=[];
                            var documents=[];

                            $scope.reviewHeader = "Reviews";

                            $scope.author_name_header = "Author Name :- ";
                            $scope.reviewtime_header = "Time of review :- ";
                            $scope.comment_header = "Comment :-";
                            $scope.user_rating_header = "User Rating :- ";

                            if(placedata.data.result.reviews !=null) {
                                $scope.author_Name = placedata.data.result.reviews[0].author_name;
                                $scope.reviewtime = placedata.data.result.reviews[0].relative_time_description;
                                $scope.comment = placedata.data.result.reviews[0].text;
                                $scope.user_rating = placedata.data.result.reviews[0].rating;


                                documents.push($scope.author_Name + '@@' + $scope.reviewtime + '##' + $scope.comment + '$$' + $scope.user_rating);

                                $scope.reviews.push($scope.author_Name + '@@' + $scope.reviewtime + '##' + $scope.comment + '$$' + $scope.user_rating);
                            }

                            //console.log($scope.author_Name + '@@' + $scope.reviewtime + '##' + $scope.comment + '$$'+$scope.user_rating);
                            // for(var x=0;x<documents.length;x++) {
                            //     $scope.reviews.push((documents[x]).toString());
                            // }


                            $scope.weeklyhoursheader = "Weeekly Hours";
                            for (var k = 0; k < 7; k++) {
                                try {
                                    var weekday_timings = placedata.data.result.opening_hours.weekday_text[k];
                                    $scope.weekdayHours_week.push(weekday_timings);
                                }
                                catch (e) {
                                    $scope.weekdayHours_week.push("All Working Days");
                                    break;

                                }
                            }
                            $scope.weekdayHours.push($scope.weekdayHours_week);
                        })

                    }
                }
                catch (e) {

                }
            }, 1000);

            var dataParams = {
                'username' : localStorage.getItem("userid123"),
                'destination' : $scope.searchDestination,
                'from' : $scope.from,
                'to' : $scope.to,
                'budget': $scope.budget,
                'interest' : document.getElementById("interest").value
            };
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
            var req = $http.post('http://127.0.0.1:8081/insdata',dataParams);
            req.success(function(data, status, headers, config) {
                $scope.message = data;
                console.log("here "+data);
            });
            req.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });

        }
    });
