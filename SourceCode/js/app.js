/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('demoMongo',[]);
myapp.run(function ($http) {
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    $http.defaults.headers.post['dataType'] = 'json'
});
myapp.controller('MongoRestController',function($scope,$http,$window){
    $scope.insertData = function(){
        // console.log($scope.formData.lname);
        console.log($scope.fname);
        // $scope.formData.confirmpassword= "tst";

        var dataParams = {
            'firstname' : $scope.fname,
            'lastname' : $scope.lname,
            'username' : $scope.uname,
            'password' : $scope.password,
            'confirmpassword' : $scope.confirmpassword
        };

        x=true;
        if (!($scope.fname)  || !($scope.uname) || !($scope.password) || !($scope.confirmpassword))
        {
            $scope.finalErr = '              Mandatory columns should be entered';
            x=false;
            console.log("In mandatory error");
        }
        var alpha= new RegExp('.*\\d.*');
        if ((alpha.test($scope.fname)) && ($scope.fname)) { // not email
            $scope.finalErr = '              Numbers are not allowed in First Name';
            x=false;
        }

        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!(re.test($scope.uname)) && ($scope.uname)) {
            $scope.finalErr = '                  Please enter correct Email Address';
            x=false;
        }

        if (!($scope.confirmpassword==$scope.password)) {
            $scope.finalErr = '                  Passwords should be same';
            x=false;
        }

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        if(x==true) {


            $http.get('http://127.0.0.1:8081/getData?keywords='+$scope.uname).then(function(d)
                {
                    console.log("Len is "+d.data.length);
                    console.log("val "+JSON.stringify({d: d}));

                    if(d.data.length!=0) {
                        console.log("it is " + d.data[0].username);
                        var eamilAdd = d.data[0].username;

                        if (eamilAdd != "") {

                            $scope.finalErr = '                         User Name Already Exists';
                            console.log("User Name Already Exists");

                        }
                    }
                    else
                    {


                        var req = $http.post('http://127.0.0.1:8081/enroll', dataParams);
                        req.success(function (data, status, headers, config) {
                            $scope.message = data;
                            console.log("here " + data);
                            $scope.finalErr = "";
                            $window.location.href = 'LoginPage.html';
                        });
                        req.error(function (data, status, headers, config) {
                            // alert( "failure message: " + JSON.stringify({data: data}));
                            console.log("failure message: " + JSON.stringify({data: data}));
                        });

                    }

                },function(err)
                {
                    console.log(err);
                }

            )
        }
    };
});
myapp.controller('getController',function($scope,$http){
    $scope.getDbData = function(){
        console.log($scope.formData.major);
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        // var req = $http.get('http://127.0.0.1:8081/getData');
        $http.get('http://127.0.0.1:8081/getData?keywords='+$scope.formData.major).then(function(d)
            {
                // console.log(typeof(d));
                // console.log("length is "+d.data.length);
                var document=[];
                for (i=0;i<d.data.length;i++)
                {
                    // console.log("it is "+d.data[i].classID);
                    // console.log("it is "+d.data[i].major);
                    document.push(new Array(d.data[i].classID+'-'+d.data[i].studentName+'+'+d.data[i].courseStudy+'@'+d.data[i].major+'#'+d.data[i].minor));
                }
                // console.log("document is "+document);
                // console.log("val "+JSON.stringify({d: d}));

                $scope.fullDocument =[];
                for(var x=0;x<document.length;x++) {
                    var val= document[x];
                    console.log('Data is '+document[x]);
                    $scope.fullDocument.push(val.toString());
                }

            },function(err)
            {
                console.log(err);
            }
        )
    };
});
