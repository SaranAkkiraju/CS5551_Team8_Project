angular.module('indexpage',[])
    .controller('indexctrl', function($scope, $http) {
        $scope.getSearchResult = function() {
            $http.get("https://kgsearch.googleapis.com/v1/entities:search?query="+$scope.searchDestination+"&key=AIzaSyCWvzC7Mbg13R7bUOc2NLdBcFtEJfQse0k&limit=1&indent=True").then(function(data)
            {
                //alert("success triggered");
                try {
                    console.log(data);
                    console.log(data);
                    console.log(data);

                    $scope.searchDescription = data.data.itemListElement[0].result.detailedDescription.articleBody;
                    $scope.description = "Description:";
                    $scope.wiki = data.data.itemListElement[0].result.detailedDescription.url;
                    $scope.wikiheading = "Explore " + $scope.searchDestination + " wiki in the following link";
                    $scope.searchimage = data.data.itemListElement[0].result.image.contentUrl;
                    document.getElementById("errormsg").innerHTML ="";

                }
                catch(err){
                    document.getElementById("errormsg").innerHTML = "Please Correct your search item";
                }
            })
        }
    });
