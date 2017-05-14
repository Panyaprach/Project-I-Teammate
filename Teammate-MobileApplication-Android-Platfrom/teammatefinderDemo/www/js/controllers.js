var localhost = "localhost";

angular.module('app.controllers', ['ngCordova','ngCordovaOauth','ion-datetime-picker'])

.controller('FacebookCtrl', function($scope,$http,$cordovaOauth,$location,$state){
  $scope.getUser = function(){

    }

  $scope.facebookLogin = function(){
     $cordovaOauth.facebook("1432633710094204", ["public_profile","email"]).then(function(result) {
         console.log(JSON.stringify(result));
        //window.localStorage.setItem("AccessToken",result.access_token);
          $scope.access_token = result.access_token
          //$http.get("https://graph.facebook.com/v2.8/me?access_token="+$scope.access_token+"").success
        $http.get("https://graph.facebook.com/v2.8/me", { params: { access_token: $scope.access_token, fields: "id,name,gender,email,picture,age_range", format: "json" }}).then(function(result) {
            $scope.fbid = result.data.id;
            $scope.email = result.data.email;
            $scope.name = result.data.name;
            $scope.gender = result.data.gender;
            $scope.age_range = result.data.age_range.min;
            $scope.picture = result.data.picture.data.url;
            //alert(""+$scope.picture);
            //alert("Login Success");
            $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/customer/' }).success(function (result) {
              //alert("Getting Customer");
                $scope.DataCustomer = JSON.stringify(result);
                $scope.DataParseCustomer = JSON.parse($scope.DataCustomer);
                var DataCustomerArray = $scope.DataParseCustomer;
                var FacebookId = $scope.fbid;
                //alert(""+FacebookId);
                for (var i=0; i< DataCustomerArray.length; i++) {
                  var JSONUsername = DataCustomerArray[i];
                  console.log(JSONUsername.username);
                  if(JSONUsername.username == FacebookId){
                    //console.log("Found");
                    $state.go('tabsController.newFeed');
                    break;
                  }else{
                    $state.go('signUp', {id:$scope.fbid,name:$scope.name,gender:$scope.gender,email:$scope.email,picture:$scope.picture,age:$scope.age_range});
                  }
                }// for i
              }).error(function (data) {
                  alert("CON'T CONNECT WEB SERVICES");
              })


         });

     }, function(error) {
         console.log(error);
     });
     }
     $scope.CheckUser = function(){
          $scope.facebookLogin();
          var FacebookId = $scope.fbid;
        //  $scope.getUser();

          //var FacebookId = $scope.fbid;
          //var FacebookId ='100015823688624';
          //console.log(DataCustomerArray);
          if ((DataCustomerArray !== undefined) && (FacebookId !== undefined )) {

        }else{
          alert("ERROR UNDEFINED");
        }
     }



})

.controller('signUpCtrl',function ($scope, $stateParams,$http) {
        $scope.name = $stateParams.name;
        $scope.gender = $stateParams.gender;
        $scope.email = $stateParams.email;
        $scope.age = $stateParams.age;
        $scope.picture = $stateParams.picture;
        $scope.addlist={}
        $scope.addlist.age = true;
        console.log("TEST");
        $scope.change = function(){
          console.log($scope.addlist.age);
        }
        $scope.sports={};
        $scope.format=function(){
        $scope.modifiedsports=[];
        angular.forEach($scope.sports, function(value, key) {
          if(value){
            $scope.modifiedsports.push(parseInt(key));
          }
        })
          console.log($scope.modifiedsports);
        }

})

.controller('newFeedCtrl', ['$scope', '$stateParams','$http',
function ($scope, $stateParams, $http) {
  $scope.getAdvertise = function(){
      $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/advertise/' }).success(function (result) {
          $scope.dataAdver = JSON.stringify(result);
          $scope.DataParse = JSON.parse($scope.dataAdver);

            }).error(function (data) {
            alert("CON'T CONNECT WEB SERVICES");
        });
      }


}])

.controller('findFriendCtrl', ['$scope', '$stateParams','$state','$http',
function ($scope, $stateParams, $state, $http) {
    $scope.getFriend = function(){
      $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/customer/'}).success(function (result) {
          $scope.dataCustomer = JSON.stringify(result);
          $scope.DataParseCustomer = JSON.parse($scope.dataCustomer);
            }).error(function (data) {
            alert("CON'T CONNECT WEB SERVICES");
        });

    }
    $scope.ToDetail = function (CId) {
        $scope.id = CId;
      //  alert("ID: FindFriend"+$scope.id);
        $state.go('tabsController.friendDetail', {CId:$scope.id});
    };
  /*$scope.friends = [
          { id:1, title: "Jatuwit Pitakdansakul", thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/16831125_1327430143980127_563340370637500068_n.jpg?oh=35499672b507a02c98da041e4dfb2440&oe=595DB2C1", age: "21", sport: "Football,Basketball"},
          { id:2, title: "Sutita Saraya", thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/14034880_1073722982747883_2869991271281568838_n.jpg?oh=927c2872a2d6fe292dd9b145bd374b8e&oe=59607725", age: "21", sport: "Badminton,Tennis"},
          { id:3, title: "Panuwat Buranaprapan", thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-1/13118865_985332761521271_1909429602424591229_n.jpg?oh=31e23192e0b07c0a9502b65caf5afe67&oe=5961FA44", age: "20", sport: "Table Tennis,Basketball"},
          { id:4, title: "Tunyared Khiawthong", thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t31.0-1/c212.0.960.960/p960x960/16601915_1216024748444583_969956501348332975_o.jpg?oh=31e0d56121668e4e7acd304417734a8a&oe=5961B4B9", age: "21", sport: "Football,Basketball"}
    ];
    */


}])

.controller('friendDetailCtrl', ['$scope', '$stateParams','$state','$http',
function ($scope, $stateParams, $state, $http) {
      $scope.id = $stateParams.CId;
      //   alert("ID Friend Detail "+$scope.id);
      $scope.getFriendDetail = function(){
          $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/customer/'+$scope.id }).success(function (result) {
              $scope.dataCustomer = JSON.stringify(result);
              $scope.DataParseCustomer = JSON.parse($scope.dataCustomer);
              $scope.Cid = $scope.DataParseCustomer.CId;
              $scope.firstname = $scope.DataParseCustomer.firstname;
              $scope.lastname = $scope.DataParseCustomer.lastname;
              $scope.aboutme = $scope.DataParseCustomer.aboutme;
              $scope.age = $scope.DataParseCustomer.age;
              $scope.image = $scope.DataParseCustomer.image.path;
              //console.log($scope.image);

                }).error(function (data) {
                alert("CON'T CONNECT WEB SERVICES");
            });
        }

        $scope.ToShowLobby = function(Cid){
            $scope.fid = Cid;
            console.log(Cid);
            //alert("FID: Detail "+fid);
            $state.go('tabsController.selectYourLobby', {fid:$scope.fid});
        }

}])

.controller('selectYourLobbyCtrl', ['$scope', '$stateParams','$state','$http', '$ionicPopup','$timeout',
function ($scope, $stateParams, $state, $http, $ionicPopup, $timeout) {
  $scope.fid = $stateParams.fid;
  $scope.getFriendDetail = function(){
      $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/customer/'+$scope.fid }).success(function (result) {
          $scope.dataCustomer = JSON.stringify(result);
          $scope.DataParseCustomer = JSON.parse($scope.dataCustomer);
          $scope.Cid = $scope.DataParseCustomer.CId;
          $scope.firstname = $scope.DataParseCustomer.firstname;
          $scope.lastname = $scope.DataParseCustomer.lastname;
          $scope.aboutme = $scope.DataParseCustomer.aboutme;
          $scope.age = $scope.DataParseCustomer.age;
          $scope.image = $scope.DataParseCustomer.image.path;
          //console.log($scope.image);
          console.log($scope.DataParseCustomer);
            }).error(function (data) {
            alert("CON'T CONNECT WEB SERVICES");
        });
    }
  $scope.getMyLobby = function(){
    $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/joinlobby/cId/1'}).success(function (result) {
        $scope.DataMyLobby = JSON.stringify(result);
        $scope.DataParseMyLobby = JSON.parse($scope.DataMyLobby);
        $scope.MyID = $scope.DataParseMyLobby.CId;
        console.log($scope.DataParseMyLobby);
          }).error(function (data) {
          alert("CON'T CONNECT WEB SERVICES");
      });
  }// get Lobby function

  $scope.CheckPicture = function(SId){
          $scope.IdSport = SId;
          switch($scope.IdSport) {
                case 1:
                    $scope.picSport = "img/1.png";
                    $scope.sportname = "Volleyball";
                break;
                case 2:
                    $scope.picSport = "img/2.png";
                    $scope.sportname = "Football";
                break;
                case 3:
                    $scope.picSport = "img/3.png";
                    $scope.sportname = "Badminton";
                break;
                case 4:
                    $scope.picSport = "img/4.png";
                    $scope.sportname = "Tennis";
                break;
                case 5:
                    $scope.picSport = "img/5.png";
                    $scope.sportname = "Table Tennis";
                break;
                case 6:
                    $scope.picSport = "img/6.png";
                    $scope.sportname = "Golf";
                break;
                case 7:
                    $scope.picSport = "img/7.png";
                    $scope.sportname = "Fissness";
                break;
              default:
                    $scope.picSport = "";
                    $scope.sportname = "Empty";
                break;
          }
         //console.log($scope.picSport+ ": "+  $scope.sportname );
          return $scope.picSport;
      }// Check Picture function
      /*

*/
  $scope.ToConfirmInvite = function(lid){
      $scope.lid = lid;
      //console.log("lId "+$scope.lid);
      $state.go('tabsController.confirmToInvite', {FId:$scope.fid,LId:$scope.lid });
    }

}])

.controller('confirmToInviteCtrl', ['$scope', '$stateParams','$state','$http','$timeout','$ionicPopup',
function ($scope, $stateParams, $state,$http,$timeout,$ionicPopup) {
  $scope.fid = $stateParams.FId;
  $scope.lid = $stateParams.LId;
  //alert($scope.fid+"++++"+$scope.lid);
  //alert("FID:"+$stateParams.fid+"LID:"+$scope.lid);
  $scope.getMyLobby = function(){
    $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/lobby/'+$scope.lid }).success(function (result) {
        $scope.DataMyLobby = JSON.stringify(result);
        $scope.DataParseMyLobby = JSON.parse($scope.DataMyLobby);
        $scope.nameLobby = $scope.DataParseMyLobby.name;
        $scope.IdSport = $scope.DataParseMyLobby.sport.SId;
        $scope.sport = $scope.DataParseMyLobby.sport.name;
        $scope.description = $scope.DataParseMyLobby.description
        $scope.start_date = $scope.DataParseMyLobby.startTime;
        $scope.location = $scope.DataParseMyLobby.location.name;
        switch($scope.IdSport) {
              case 1:
                  $scope.picSport = "img/1.png";
                  $scope.sportname = "Volleyball";
              break;
              case 2:
                  $scope.picSport = "img/2.png";
                  $scope.sportname = "Football";
              break;
              case 3:
                  $scope.picSport = "img/3.png";
                  $scope.sportname = "Badminton";
              break;
              case 4:
                  $scope.picSport = "img/4.png";
                  $scope.sportname = "Tennis";
              break;
              case 5:
                  $scope.picSport = "img/5.png";
                  $scope.sportname = "Table Tennis";
              break;
              case 6:
                  $scope.picSport = "img/6.png";
                  $scope.sportname = "Golf";
              break;
              case 7:
                  $scope.picSport = "img/7.png";
                  $scope.sportname = "Fissness";
              break;
            default:
                  $scope.picSport = "";
                  $scope.sportname = "Empty";
              break;
        }
        //console.log($scope.DataParseMyLobby);
          }).error(function (data) {
          alert("CON'T CONNECT WEB SERVICES");
      });
  }// get Lobby function
  $scope.getFriend = function(){
    $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/customer/'+$scope.fid}).success(function (result) {
        $scope.dataCustomer = JSON.stringify(result);
        $scope.DataParseCustomer = JSON.parse($scope.dataCustomer);
        $scope.firstname = $scope.DataParseCustomer.firstname;
        $scope.lastname = $scope.DataParseCustomer.lastname;
        $scope.age = $scope.DataParseCustomer.age;
        $scope.image = $scope.DataParseCustomer.image.path;
        //$scope.sport = $scope.DataParseCustomer.sport;
          }).error(function (data) {
          alert("CON'T CONNECT WEB SERVICES");
      })
  }
  var customer = 1;
  $scope.getMyData = function(){
    $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/customer/'+customer}).success(function (result) {
        $scope.dataMyData = JSON.stringify(result);
        $scope.DataParseMyData = JSON.parse($scope.dataMyData);
        $scope.firstname = $scope.DataParseMyData.firstname;
        $scope.lastname = $scope.DataParseMyData.lastname;
        $scope.age = $scope.DataParseMyData.age;
        $scope.image = $scope.DataParseMyData.image.path;
        console.log('In function'+$scope.DataParseMyData);
        //$scope.sport = $scope.DataParseCustomer.sport;
          }).error(function (data) {
          alert("CON'T CONNECT WEB SERVICES");
      })
  }

  $scope.ShowFriendAndLobby = function(){
      $scope.getMyLobby();
      $scope.getFriend();
  }
  $scope.PostNotify = function(){
    $timeout(function() { $scope.getMyLobby(); },1000)
    $timeout(function() { $scope.getFriend(); }, 1000)
    $timeout(function() { $scope.getMyData();
      console.log($scope.DataParseMyData);
    }, 1500)
    console.log($scope.DataParseMyLobby);
    console.log($scope.DataParseCustomer);

    /*
    if(($scope.DataParseMyLobby !== undefined)&&($scope.DataParseMyData !== undefined)&&($state.DataParseCustomer !== undefined)){
        $timeout(function() {
          var requestNotify = $http({
              method: "post",
              url: "http://"+localhost+":8080/Teammate-Dev/api-v1/notify/",
              data:  {
                "content": "invite",
                "dateread": "2017-05-15T22:45:57",
                "fromUser": $scope.DataParseMyData,
                "haveRead": false,
                "inviteTo": $scope.DataParseMyLobby,
                "toUser": $state.DataParseCustomer
                },
              headers: { 'Content-Type': 'application/json; charset=utf-8' }
          });
          requestNotify.success(function (data) {
              $scope.message = "Console Request requestNotify: "+data;
              console.log("I'm in request notify");
                var alertPopup = $ionicPopup.alert({
                  title: 'Congratulation',
                  template: 'Sent your invitation success'
                });
                alertPopup.then(function(res) {
                    $state.go('tabsController.newfeed');
                });

          });
          requestNotify.error(function(data){
              $scope.message = "Console Request requestNotify:"+data;
              console.log($scope.message);
              var alertPopup = $ionicPopup.alert({
                title: 'Wrong!!',
                template: 'Please Check your connection'
              });
              alertPopup.then(function(res) {
                  $state.go('tabsController.findlobby');
              });
          });
        }, 2500)
      }// Check undefined object
      */
  }

}])

.controller('createYourLobbyCtrl', ['$scope', '$stateParams','$http','$state',
function ($scope, $stateParams, $http, $state) {
  $scope.getLocation = function(){
      $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/location/' }).success(function (result) {
          $scope.DataLocation = JSON.stringify(result);
          $scope.DataParseLocation = JSON.parse($scope.DataLocation);

            }).error(function (data) {
            alert("CON'T CONNECT WEB SERVICES");
        });
      }
  $scope.ToCreateLobby = function (LocationId) {
          $scope.LocationID = LocationId;
        //  alert("ID:"+$scope.idsent);
          $state.go('tabsController.createYourLobby2', {LocationId:$scope.LocationID});
  }

}])

.controller('createYourLobby2Ctrl', ['$scope', '$stateParams','$http','$ionicPopup','$state','$timeout',
function ($scope, $stateParams,$http,$ionicPopup,$state,$timeout) {
  $scope.LocationId = $stateParams.LocationId;
  $scope.lobby = {};
  $scope.getLocation = function(){
      $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/location/'+$scope.LocationId}).success(function (result) {
          $scope.dataMedical = JSON.stringify(result);
          $scope.LocationJSON = JSON.parse($scope.dataMedical);
          $scope.LocationId = $scope.LocationJSON.lcId;
          $scope.LocationName = $scope.LocationJSON.name;
            }).error(function (data) {
            alert("ERROR");
        });
      }
  $scope.getCustomer = function(){
            $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/customer/1' }).success(function (result) {
                  $scope.CustomerData = JSON.stringify(result);
                  $scope.DataParseCustomer = JSON.parse($scope.CustomerData);
                  // console.log($scope.DataParseCustomer);
                    }).error(function (data) {
                    alert("CON'T CONNECT WEB SERVICES");
                });
  }
  $scope.getLobby = function(){
    $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/lobby/'}).success(function (result) {
        $scope.DataLobby = JSON.stringify(result);
        $scope.DataParseLobby = JSON.parse($scope.DataLobby);
        //console.log($scope.DataParseLobby.length+4);

          }).error(function (data) {
          alert("CON'T CONNECT WEB SERVICES");
      });
  }
  $scope.PostLobby = function(){
    $scope.getCustomer();
    $scope.getLocation();
    $scope.getLobby();
    //console.log("Fisrt "+$scope.DataParseLobby);
    if(($scope.LocationJSON !== undefined)&&($scope.DataParseCustomer!== undefined)&&($scope.DataParseLobby!== undefined)){

          console.log($scope.lobby.datetimeValue);
          $scope.sportname = "";

          switch($scope.lobby.sport) {
                case '1':
                    console.log("I'm in switch function");
                    $scope.sportname = "Volleyball";
                break;
                case '2':
                    $scope.sportname = "Football";
                break;
                case '3':
                    $scope.sportname = "Badminton";
                break;
                case '4':
                    $scope.sportname = "Tennis";
                break;
                case '5':
                    $scope.sportname = "Table Tennis";
                break;
                case '6':
                    $scope.sportname = "Golf";
                break;
                case '7':
                    $scope.sportname = "Fissness";
                break;
              default:
                    $scope.sportname = "Empty Don't Know";
                break;
          }
          var thislobby = $scope.DataParseLobby.length;

          var requestLobby = $http({
              method: "post",
              url: "http://"+localhost+":8080/Teammate-Dev/api-v1/lobby/",
              data:{
                  "description": $scope.lobby.Descriptionlobby,
                  "endTime": "2017-02-15T20:00:00",
                  "location": {
                    "byAdmin": true,
                    "latitude":$scope.LocationJSON.latitude,
                    "lcId": $scope.LocationJSON.lcId,
                    "longitude": $scope.LocationJSON.longitude,
                    "name":   $scope.LocationJSON.name
                  },
                  "maxMember": $scope.lobby.maxplay,
                  "name": $scope.lobby.Namelobby,
                  "sport": {
                    "SId": $scope.lobby.sport,
                    "name": $scope.sportname
                  },
                  "startTime": "2017-02-15T17:00:00"
                },
              headers: { 'Content-Type': 'application/json; charset=utf-8' }
          });
          requestLobby.success(function (data) {
              $scope.getLobby();
              $scope.message = "Console requestLobby : "+data;
          });
          requestLobby.error(function(data){
              $scope.message = "Console requestLobby:"+data;
              console.log($scope.message);
              alert("Error");
          });

          $timeout(function() { $scope.getLobby(); }, 2500);

          $timeout(function() {
            var requestJoinLobby = $http({
                method: "post",
                url: "http://"+localhost+":8080/Teammate-Dev/api-v1/joinlobby/",
                data:  {
                    "CId":   $scope.DataParseCustomer,
                    "isHead": true,
                    "lbId": $scope.DataParseLobby
                  },
               headers: { 'Content-Type': 'application/json; charset=utf-8' }
            });
            requestJoinLobby.success(function (data) {
                $scope.message = "Console requestJoinLobby : "+data;
                //alert("Success");
                //$state.go("/showchatdetail");
              });
            requestJoinLobby.error(function(data){
                $scope.message = "Console requestJoinLobby :"+data;
                console.log($scope.message);
                alert("Error");
              });
            }, 2500)
          $timeout(function() {
          var requestConversation = $http({
              method: "post",
              url: "http://"+localhost+":8080/Teammate-Dev/api-v1/conversation/",
              data:  {
              "CId": $scope.DataParseCustomer,
              "content": "Start conversation in this Lobby!",
              "datesent": "2017-05-04T10:52:03",
              "lbId": $scope.DataParseLobby
                },
              headers: { 'Content-Type': 'application/json; charset=utf-8' }
          });
          requestConversation.success(function (data) {
                $scope.message = "Console Request Conversation: "+data;

                  var alertPopup = $ionicPopup.alert({
                    title: 'Congratulation',
                    template: 'Create your lobby success'
                  });
                  alertPopup.then(function(res) {
                      $state.go('tabsController.chatLobby');
                  });

            });
          requestConversation.error(function(data){
                $scope.message = "Console Request Conversation:"+data;
                console.log($scope.message);
                var alertPopup = $ionicPopup.alert({
                  title: 'Wrong!!',
                  template: 'Please Check your connection'
                });
                alertPopup.then(function(res) {
                    $state.go('tabsController.chatLobby');
                });
            });
          }, 2500)

        }// Check Undefinded Object

  }
  $scope.ToConfirmCreate= function(){
    if(
            ($scope.lobby.maxplay == null)&&
            ($scope.lobby.Namelobby == null)&&
            ($scope.lobby.sport == null)&&
            ($scope.lobby.datetimeValue == null)&&
            ($scope.lobby.sport == null)
    ){
        var alertPopup = $ionicPopup.alert({
          title: 'Some value is empty',
          template: 'Please check your value again'
        });
    }else{
        var confirmPopup = $ionicPopup.confirm({
          title: 'Create Lobby?',
          template: 'Are you sure create lobby?'
        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');

              $scope.PostLobby();

            //$scope.PostLobby();

          } else {
            console.log('You are not sure');
          }
        });
        //$state.go('tabsController.confirmToInvite', {fid:$scope.fid,lid:$scope.lid});
      }
    }
}])

.controller('pleaseMarkYourLocationCtrl', ['$scope', '$stateParams','$ionicLoading','$compile',
function ($scope, $stateParams, $ionicLoading, $compile) {

}])

.controller('setNameLocationCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])

.controller('findLobbyCtrl', ['$scope', '$stateParams','$state','$http',
function ($scope, $stateParams, $state, $http) {
  $scope.getLobby = function(){
    $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/lobby/'}).success(function (result) {
        $scope.DataLobby = JSON.stringify(result);
        $scope.DataParseLobby = JSON.parse($scope.DataLobby);
          }).error(function (data) {
          alert("CON'T CONNECT WEB SERVICES");
      });
  }// get Lobby function
  $scope.CheckPicture = function(SId){
            $scope.IdSport = SId;
            switch($scope.IdSport) {
                  case 1:
                      $scope.picSport = "img/1.png";
                      $scope.sportname = "Volleyball";
                  break;
                  case 2:
                      $scope.picSport = "img/2.png";
                      $scope.sportname = "Football";
                  break;
                  case 3:
                      $scope.picSport = "img/3.png";
                      $scope.sportname = "Badminton";
                  break;
                  case 4:
                      $scope.picSport = "img/4.png";
                      $scope.sportname = "Tennis";
                  break;
                  case 5:
                      $scope.picSport = "img/5.png";
                      $scope.sportname = "Table Tennis";
                  break;
                  case 6:
                      $scope.picSport = "img/6.png";
                      $scope.sportname = "Golf";
                  break;
                  case 7:
                      $scope.picSport = "img/7.png";
                      $scope.sportname = "Fissness";
                  break;
                default:
                      $scope.picSport = "";
                      $scope.sportname = "Empty";
                  break;
            }
          //  console.log($scope.picSport+ ": "+  $scope.sportname );
            return $scope.picSport;
        }// Check Picture function
  $scope.ToDetail = function (idR) {
            $scope.idsent = idR;
          //  alert("ID:"+$scope.idsent);
            $state.go('tabsController.lobbyDetail', {id:$scope.idsent});
        };

}])

.controller('lobbyDetailCtrl', ['$scope', '$stateParams','$state','$http','$ionicPopup','$timeout',
function ($scope, $stateParams, $state, $http, $ionicPopup, $timeout) {
  $scope.id = $stateParams.id;
  $scope.getCustomer = function(){
            $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/customer/1' }).success(function (result) {
                  $scope.CustomerData = JSON.stringify(result);
                  $scope.DataParseCustomer = JSON.parse($scope.CustomerData);
                  // console.log($scope.DataParseCustomer);
                    }).error(function (data) {
                    alert("CON'T CONNECT WEB SERVICES");
                });
  }
  $scope.getLobby = function(){
    $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/lobby/'+$scope.id }).success(function (result) {
        $scope.DataLobby = JSON.stringify(result);
        $scope.DataParseLobby = JSON.parse($scope.DataLobby);
        $scope.LobbyId=$scope.DataParseLobby.lbId;
        $scope.name =$scope.DataParseLobby.name;
        $scope.description=$scope.DataParseLobby.description;
        $scope.startTime=$scope.DataParseLobby.startTime;
        $scope.sport=$scope.DataParseLobby.sport.name;
        $scope.IdSport=$scope.DataParseLobby.sport.SId;
        $scope.location=$scope.DataParseLobby.location.name;
        //Check Photos Sport
        switch($scope.IdSport) {
              case 1:
                  $scope.picSport = "img/1.png";
              break;
              case 2:
                  $scope.picSport = "img/2.png";
              break;
              case 3:
                  $scope.picSport = "img/3.png";
              break;
              case 4:
                  $scope.picSport = "img/4.png";
              break;
              case 5:
                  $scope.picSport = "img/5.png";
              break;
              case 6:
                  $scope.picSport = "img/6.png";
              break;
              case 7:
                  $scope.picSport = "img/7.png";
              break;
            default:
                  $scope.picSport = "img/1.png";
              break;
        }

          }).error(function (data) {
          alert("CON'T CONNECT WEB SERVICES");
      });
  }// get Lobby function
  $scope.PostJoinLobby = function(){
    $scope.getCustomer();
    $scope.getLobby();
    $timeout(function() {
      var requestJoinLobby = $http({
          method: "post",
          url: "http://"+localhost+":8080/Teammate-Dev/api-v1/joinlobby/",
          data:  {
              "CId":   $scope.DataParseCustomer,
              "isHead": false,
              "lbId": $scope.DataParseLobby
            },
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
      });
      requestJoinLobby.success(function (data) {
          $scope.message = "Console Request Conversation: "+data;
          console.log("I'm in request join");
            var alertPopup = $ionicPopup.alert({
              title: 'Congratulation',
              template: 'Join lobby is success'
            });
            alertPopup.then(function(res) {
                $state.go('tabsController.chatLobby');
            });

      });
      requestJoinLobby.error(function(data){
          $scope.message = "Console Request Conversation:"+data;
          console.log($scope.message);
          var alertPopup = $ionicPopup.alert({
            title: 'Wrong!!',
            template: 'Please Check your connection'
          });
          alertPopup.then(function(res) {
              $state.go('tabsController.findlobby');
          });
      });
    }, 2500)

  }

  $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Join this lobby?',
       template: 'Are you sure to join this lobby?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
         $scope.PostJoinLobby();
       } else {
         console.log('You are not sure');
       }
     });
   };
}])

.controller('confirmToJoinCtrl', ['$scope', '$stateParams','$state','$http',
function ($scope, $stateParams,$state,$http) {
  $scope.id = $stateParams.id;
  //alert("ID :"+$scope.id);
  $scope.lobbyObj1 = [
          { id:1, Name: "Football เย็นนี้ครับ",
          description: "ขาดคู่แข่ง เชิญเข้ามากันครับ",
          sport: "Football",
          date:"21/03/2017",
          location:"PSU Phuket Football Fields",
          Maximum:"3",
          path: "img/01.png" }
    ];
  $scope.lobbyObj2 =[  { id:2, Name: "Badminton กันไหมเธอ",
    description: "ขาดเพื่อนตี",
    sport: "Badminton",
    date:"22/03/2017",
    location:"PSU Phuket Stadium",
    Maximum:"2",
    path: "img/02.png"}];
    if($scope.id==1) $scope.show = $scope.lobbyObj1;
    if($scope.id==2) $scope.show = $scope.lobbyObj2;
    $scope.ShowSuccess=function(){
      alert("Joined");
      $state.go('tabsController.findLobby');
    };
}])

.controller('chatLobbyCtrl', ['$scope', '$stateParams','$http','$state',
function ($scope, $stateParams,$http,$state) {
  $scope.getMyLobby = function(){
      $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/joinlobby/cId/1' }).success(function (result) {
          $scope.MyLobbyData = JSON.stringify(result);
          $scope.DataParseMyLobby = JSON.parse($scope.MyLobbyData);

          console.log($scope.JoinId + $scope.LobbyName);
            }).error(function (data) {
            alert("CON'T CONNECT WEB SERVICES");
        });
      }
  $scope.CheckPicture = function(SId){
          $scope.IdSport = SId;
          switch($scope.IdSport) {
                case 1:
                    $scope.picSport = "img/1.png";
                    $scope.sportname = "Volleyball";
                break;
                case 2:
                    $scope.picSport = "img/2.png";
                    $scope.sportname = "Football";
                break;
                case 3:
                    $scope.picSport = "img/3.png";
                    $scope.sportname = "Badminton";
                break;
                case 4:
                    $scope.picSport = "img/4.png";
                    $scope.sportname = "Tennis";
                break;
                case 5:
                    $scope.picSport = "img/5.png";
                    $scope.sportname = "Table Tennis";
                break;
                case 6:
                    $scope.picSport = "img/6.png";
                    $scope.sportname = "Golf";
                break;
                case 7:
                    $scope.picSport = "img/7.png";
                    $scope.sportname = "Fissness";
                break;
              default:
                    $scope.picSport = "";
                    $scope.sportname = "Empty";
                break;
          }
         //console.log($scope.picSport+ ": "+  $scope.sportname );
          return $scope.picSport;
      }// Check Picture function
  $scope.ToChatRoom = function (LobbyId) {
          $scope.LobbyId = LobbyId;
        //  alert("ID:"+$scope.idsent);
          $state.go('tabsController.chatRoom', {LobbyId:$scope.LobbyId});
  }
}])

.controller('chatRoomCtrl', ['$scope', '$stateParams','$http','$state','$timeout',
function ($scope, $stateParams, $http,$state,$timeout) {
  $scope.LobbyId = $stateParams.LobbyId;
  //alert("Lobby Id"+$scope.LobbyId);
  $scope.getMessage = function(){
      $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/conversation/lobby/'+$scope.LobbyId }).success(function (result) {
          $scope.ChatRoomData = JSON.stringify(result);
          $scope.DataParseChatRoom = JSON.parse($scope.ChatRoomData);
          //console.log($scope.DataParseChatRoom);
            }).error(function (data) {
            alert("CON'T CONNECT WEB SERVICES");
        });
      $timeout(function(){
         $scope.getMessage();
       },1000)
     };
     $scope.getMessage();
  $scope.getCustomer = function(){
        $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/customer/1' }).success(function (result) {
              $scope.CustomerData = JSON.stringify(result);
              $scope.DataParseCustomer = JSON.parse($scope.CustomerData);
                }).error(function (data) {
                alert("CON'T CONNECT WEB SERVICES");
            });
          }
  $scope.getLobby = function(){
        $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/lobby/'+$scope.LobbyId }).success(function (result) {
              $scope.LobbyData = JSON.stringify(result);
              $scope.DataParseLobby = JSON.parse($scope.LobbyData);

              }).error(function (data) {
              alert("CON'T CONNECT WEB SERVICES");
            });
  }
  $scope.MessageInput ="";
  $scope.PostMessage = function(){
      $scope.getCustomer();
      $scope.getLobby();
      if(( $scope.DataParseCustomer !== undefined)&&($scope.DataParseLobby !==undefined)&&($scope.DataParseLobby !== null)){
        var request = $http({
            method: "post",
            url: "http://"+localhost+":8080/Teammate-Dev/api-v1/conversation/",
            data:{
                "CId": $scope.DataParseCustomer,
                "conId": "",
                "content": $scope.MessageInput,
                "datesent": "2017-05-02T10:52:03",
                "lbId":  $scope.DataParseLobby

              },
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
        request.success(function (data) {
            $scope.message = "Console : "+data;
            //alert("Success");
            //$state.go("/showchatdetail");
        });
        request.error(function(data){
            $scope.message = "Console :"+data;
            console.log($scope.message);
            alert("Error");
        });
      }
    }

  $scope.CheckUser = function(CId){
        $scope.CId = CId;
      //  console.log( "Customer ID"+ $scope.CId );
        switch($scope.CId) {
              case 1:
                $scope.classname = 'ChatSent';
              break;
            default:
              $scope.classname = 'ChatReceive';
              break;
        }
       //console.log($scope.picSport+ ": "+  $scope.sportname );
        return $scope.classname;
    }
}])

.controller('menuCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])

.controller('firstAidCtrl', ['$scope', '$stateParams','$state','$http',
function ($scope, $stateParams,$state,$http) {
      $scope.getMedical = function(){
          $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/medical/' }).success(function (result) {
              $scope.dataMedical = JSON.stringify(result);
              $scope.DataParse = JSON.parse($scope.dataMedical);
              //console.log(JSON.stringify(result));
              //  console.log($scope.DataParse);

              //console.log("Data"+$scope.dataAdver);
              //alert(" Data "+$scope.dataAdver);
                }).error(function (data) {
                alert("ERROR");
            });
          }

      $scope.ToDetail = function (idR) {
          $scope.idsent = idR;
        //  alert("ID:"+$scope.idsent);
          $state.go('firstAidDetail', {id:$scope.idsent});
      };
}])

.controller('firstAidDetailCtrl', ['$scope', '$stateParams','$http',
function ($scope, $stateParams,$http) {
  var id = $stateParams.id;
  //alert("ID :"+id);
  $scope.getMedicalDetail = function(){
    //alert("In Function");
      $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/medical/'+id
    }).success(function (result) {
          $scope.dataMedical = JSON.stringify(result);
          $scope.DataParseJSON = JSON.parse($scope.dataMedical);
          $scope.MId = $scope.DataParseJSON.MId;
          switch ($scope.MId) {
            case 72 :
                  $scope.description = "1. เตรียมนาฬิกาชนิดที่มีเข็มบอกวินาที"+
                 "2. ใช้นิ้ว 3 นิ้ว คือ นิ้วชี้ นิ้วกลาง และนิ้วนาง กดลงบนเส้นเลือด ในตำแหน่งที่ต้องการวัด"+
                 "3. จับชีพจรภายใน 1 นาที ว่าเต้นกี่ครั้ง (จดไว้)"+
                 "4. อย่าใช้นิ้วมือกดแรงจนเกินไป"+
                 "5. ห้ามใช้นิ้วหัวแม่มือจับชีพจร เพราะไม่สามารถนับชีพจรได้แน่ชัด"+
                 "6. ก่อนจับชีพจร ควรให้ตำแหน่งที่จะจับหรืออวัยวะส่วนนั้นอยู่ในลักษณะพัก หรือวางแล้วหมุนเสียก่อนก็ได้"+
                 "         ขอบคุณภาพและข้อมูลจาก : "+"คู่มือการปฐมพยาบาลเบื้องต้นพัฒน์ สุจำนงค์ สำนักพิมพ์โอเดียนสโตร์";
              break;
            case 73 :
                    $scope.description = "1. เตรียมนาฬิกา ชนิดที่มีเข็มบอกวินาที"+
                  "2. ในขณะนับการหายใจ ไม่ควรให้ผู้ป่วยรู้ว่ากำลังนับการหายใจจะเป็นการดีสุด"+
                  "3. ให้ดูการหายใจที่อกสำหรับผู้หญิง ดูที่อกและท้องสำหรับผู้ชายและเด็ก"+
                  "4. ให้นับหายใจเข้า (ขึ้น) และหายใจออก (ลง) เป็นการหายใจหนึ่งครั้ง และให้นับเช่นนี้ไปจนครบ 1 นาที"+
                  "         ขอบคุณภาพและข้อมูลจาก : "+"คู่มือการปฐมพยาบาลเบื้องต้นพัฒน์ สุจำนงค์ สำนักพิมพ์โอเดียนสโตร์";
            break;
            case 74 :
                    $scope.description = "1. เตรียมนาฬิกาชนิดที่มีเข็มบอกวินาที"+
                   "2. ใช้นิ้ว 3 นิ้ว คือ นิ้วชี้ นิ้วกลาง และนิ้วนาง กดลงบนเส้นเลือด ในตำแหน่งที่ต้องการวัด"+
                   "3. จับชีพจรภายใน 1 นาที ว่าเต้นกี่ครั้ง (จดไว้)"+
                   "4. อย่าใช้นิ้วมือกดแรงจนเกินไป"+
                   "5. ห้ามใช้นิ้วหัวแม่มือจับชีพจร เพราะไม่สามารถนับชีพจรได้แน่ชัด"+
                   "6. ก่อนจับชีพจร ควรให้ตำแหน่งที่จะจับหรืออวัยวะส่วนนั้นอยู่ในลักษณะพัก หรือวางแล้วหมุนเสียก่อนก็ได้"+
                   "         ขอบคุณภาพและข้อมูลจาก : "+"คู่มือการปฐมพยาบาลเบื้องต้นพัฒน์ สุจำนงค์ สำนักพิมพ์โอเดียนสโตร์";
            break;
            case 75 :
                      $scope.description = "1. เริ่มพันโคนนิ้วก่อน"+
                      "2. พันเกลียวขึ้นไปหาปลายนิ้วให้ทับกันประมาณ ¼ ของส่วนกว้าง"+
                      "3. ให้พันปลายนิ้วมาหาโคน 2-3 ครั้ง แล้วพันใหม่อีกครั้ง"+
                      "4. เมื่อพันเรียบร้อยแล้ว ใช้ผ้ายางสำหรับปิดแผล ปิดด้วยปลายผ้า พันหรือมัดปลายโดยฉีกปลายออกเป็น 2 แฉก"+
                      "5. ถ้าแผลอยู่ชิดกับโคนนิ้วมาก ให้พันทอดข้ามไปข้ามมาจากโคนนิ้วกับข้อมือ"+
                     "         ขอบคุณภาพและข้อมูลจาก : "+"คู่มือการปฐมพยาบาลเบื้องต้นพัฒน์ สุจำนงค์ สำนักพิมพ์โอเดียนสโตร์";
            break;
            default:
                    $scope.description = "Empty"
              break;
          }
          //console.log($scope.description);
          $scope.content = $scope.DataParseJSON.content;
          //$scope.description = $scope.DataParseJSON.description;
          $scope.imgId = $scope.DataParseJSON.imgId.path;
            }).error(function (data) {
            alert("ERROR");
        });

      }

}])

.controller('notificationsCtrl', ['$scope', '$stateParams','$http','$state',
function ($scope, $stateParams, $http, $state) {
  $scope.getNotify = function(){
    //alert("In Function");
      $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/notify/customer/1'}).success(function (result) {
          $scope.DataNotify = JSON.stringify(result);
          $scope.DataParseNotify = JSON.parse($scope.DataNotify);
            }).error(function (data) {
            alert("ERROR");
        });
      }

      $scope.ToShowDetailNotify = function (NId) {
          $scope.idsent = NId;
        //  alert("ID:"+$scope.idsent);
          $state.go('lobbyDetail2', {id:$scope.idsent});
      };
}])

.controller('profileCtrl', ['$scope', '$stateParams','$http',
function ($scope, $stateParams, $http) {
  $scope.getProfile = function(){
      $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/customer/1' }).success(function (result) {
        //$scope.DataParseProfile=JSON.stringify(result);
         $scope.ProfileData = JSON.stringify(result);
         $scope.DataParseProfile = JSON.parse($scope.ProfileData);
          $scope.firstname = $scope.DataParseProfile.firstname;
          $scope.lastname = $scope.DataParseProfile.lastname;

          if($scope.DataParseProfile.gender==1){
              $scope.gender = "Male";
          }else{
              $scope.gender = "Female";
          }
          $scope.birthdate = $scope.DataParseProfile.birthdate;
          $scope.aboutme = $scope.DataParseProfile.aboutme;
          $scope.picture = $scope.DataParseProfile.image.path;
          $scope.age = $scope.DataParseProfile.age;
          $scope.email = $scope.DataParseProfile.email;
            }).error(function (data) {
            alert("CON'T CONNECT WEB SERVICES");
        });
      }

}])

.controller('welcomeCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])


.controller('lobbyDetail2Ctrl', ['$scope', '$stateParams','$state','$http','$ionicPopup','$timeout',
function ($scope, $stateParams, $state, $http,$ionicPopup,$timeout) {
  var id = $stateParams.NId;
  $scope.getLobby = function(){
      $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/lobby/'+id}).success(function (result) {
          $scope.Datalobby = JSON.stringify(result);
          $scope.DataParseLobby = JSON.parse($scope.Datalobby);
          //$scope.LobbyId = $scope.DataParseNotify.inviteTo.lbId;
        //  console.log($scope.DataParseNotify.NId);
            }).error(function (data) {
            alert("ERROR");
        });
  }
  $scope.CheckPicture = function(SId){
            $scope.IdSport = SId;
            switch($scope.IdSport) {
                  case 1:
                      $scope.picSport = "img/1.png";
                      $scope.sportname = "Volleyball";
                  break;
                  case 2:
                      $scope.picSport = "img/2.png";
                      $scope.sportname = "Football";
                  break;
                  case 3:
                      $scope.picSport = "img/3.png";
                      $scope.sportname = "Badminton";
                  break;
                  case 4:
                      $scope.picSport = "img/4.png";
                      $scope.sportname = "Tennis";
                  break;
                  case 5:
                      $scope.picSport = "img/5.png";
                      $scope.sportname = "Table Tennis";
                  break;
                  case 6:
                      $scope.picSport = "img/6.png";
                      $scope.sportname = "Golf";
                  break;
                  case 7:
                      $scope.picSport = "img/7.png";
                      $scope.sportname = "Fissness";
                  break;
                default:
                      $scope.picSport = "";
                      $scope.sportname = "Empty";
                  break;
            }
          // console.log($scope.picSport+ ": "+  $scope.sportname );
            return $scope.picSport;
        }// Check Picture function
  $scope.getCustomer = function(){
      $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/customer/1' }).success(function (result) {
                  $scope.CustomerData = JSON.stringify(result);
                  $scope.DataParseCustomer = JSON.parse($scope.CustomerData);
                  }).error(function (data) {
                  alert("CON'T CONNECT WEB SERVICES");
                  });
  }

  $scope.PostJoinLobby = function(){
      $timeout(function() { $scope.getLobby();   }, 1500)
      console.log("Looby "+$scope.DataParseLobby);
      $timeout(function() { $scope.getCustomer();   }, 100)
      console.log("getCustomer "+$scope.DataParseCustomer);
      if(($scope.DataParseLobby !== undefined)&&($scope.DataParseCustomer!== undefined)){
        var alertPopup = $ionicPopup.alert({
          title: 'Data Loading',
          template: 'wait a minute ...'
        });
        $timeout(function() {
              var requestJoinLobby = $http({
                  method: "post",
                  url: "http://"+localhost+":8080/Teammate-Dev/api-v1/joinlobby/",
                  data:  {
                      "CId":   $scope.DataParseCustomer,
                      "isHead": false,
                      "lbId": $scope.DataParseLobby
                    },
                  headers: { 'Content-Type': 'application/json; charset=utf-8' }
              });
              requestJoinLobby.success(function (data) {
                  $scope.message = "Console Request Conversation: "+data;
                  console.log("I'm in request join");
                    var alertPopup = $ionicPopup.alert({
                      title: 'Congratulation',
                      template: 'Join lobby is success'
                    });
                    alertPopup.then(function(res) {
                        $state.go('tabsController.chatLobby');
                    });

              });
              requestJoinLobby.error(function(data){
                  $scope.message = "Console Request Conversation:"+data;
                  console.log($scope.message);
                  var alertPopup = $ionicPopup.alert({
                    title: 'Wrong!!',
                    template: 'Please Check your connection'
                  });
                  alertPopup.then(function(res) {
                      $state.go('tabsController.findlobby');
                  });
              });
            }, 2500)
      /*
      alertPopup.then(function(res) {
          $state.go('tabsController.chatLobby');
      });

          */
        }// if check undefind
  }

  $scope.showConfirm = function() {
           var confirmPopup = $ionicPopup.confirm({
             title: 'Join this lobby?',
             template: 'Are you sure to join this lobby?'
           });
           confirmPopup.then(function(res) {
             if(res) {
               console.log('You are sure');
               $scope.PostJoinLobby();
             } else {
               console.log('You are not sure');
             }
           });
         };

}])

.controller('confirmToJoin2Ctrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])

.controller('NavCtrl', ['$scope', '$stateParams','$http',
function ($scope, $stateParams, $http) {
  $scope.getProfile = function(){
      $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/customer/1' }).success(function (result) {
        //$scope.DataParseProfile=JSON.stringify(result);
         $scope.ProfileData = JSON.stringify(result);
         $scope.DataParseProfile = JSON.parse($scope.ProfileData);
          $scope.picture = $scope.DataParseProfile.image.path;
            }).error(function (data) {
            alert("CON'T CONNECT WEB SERVICES");
        });
      }

}])



/*
$scope.lobbyObj = [{ id: 1, Name: "Bidminton ดีต่อใจ ใครๆก็ชอบ",
      description: "มาเล่นค่ะ มาๆ",
      sport: "ฺBadminton",
      date:"22/03/2017",
      time:"18.00",
      location:"PSU Phuket Stadium",
      Maximum:"3",
      path: "img/02.png" }];
$scope.getFriendDetail = function(){
    $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/customer/'+$scope.fid }).success(function (result) {
        $scope.dataCustomer = JSON.stringify(result);
        $scope.DataParseCustomer = JSON.parse($scope.dataCustomer);
        console.log($scope.DataParseCustomer);
        $scope.Cid = $scope.DataParseCustomer.Cid;
        $scope.firstname = $scope.DataParseCustomer.firstname;
        $scope.lastname = $scope.DataParseCustomer.lastname;
        $scope.aboutme = $scope.DataParseCustomer.aboutme;
        $scope.age = $scope.DataParseCustomer.age;
        $scope.image = $scope.DataParseCustomer.image.path;
        console.log($scope.image);
          }).error(function (data) {
          alert("CON'T CONNECT WEB SERVICES");
      })
    }
$scope.lobbyObj = [
        { id: 1, Name: "Bidminton ดีต่อใจ ใครๆก็ชอบ",
        description: "มาเล่นค่ะ มาๆ",
        sport: "ฺBadminton",
        date:"22/03/2017",
        location:"PSU Phuket Stadium",
        time:"18.00",
        Maximum:"3",
        path: "img/02.png" }
    ];


$scope.lobbyObj = [
        { id:1, Name: "Football เย็นนี้ครับ",
        description: "ขาดคู่แข่ง เชิญเข้ามากันครับ",
        sport: "Football",
        date:"21/03/2017",
        location:"PSU Phuket Football Fields",
        Maximum:"3",
        path: "img/01.png" },
        { id:2, Name: "Badminton กันไหมเธอ",
        description: "ขาดเพื่อนตี",
        sport: "Badminton",
        date:"22/03/2017",
        location:"PSU Phuket Stadium",
        Maximum:"2",
        path: "img/02.png"}
  ];
  $scope.lobbyObj1 = [
          { id: 1, Name: "Football เย็นนี้ครับ",
          description: "ขาดคู่แข่ง เชิญเข้ามากันครับ",
          sport: "Football",
          date:"21/03/2017",
          location:"PSU Phuket Football Fields",
          Maximum:"3",
          path: "img/01.png" }
    ];
  $scope.lobbyObj2 =[  { id: 2, Name: "Badminton กันไหมเธอ",
    description: "ขาดเพื่อนตี",
    sport: "Badminton",
    date:"22/03/2017",
    location:"PSU Phuket Stadium",
    Maximum:"2",
    path: "img/02.png"}];
    if($scope.id==1) $scope.show = $scope.lobbyObj1;
    if($scope.id==2) $scope.show = $scope.lobbyObj2;

*/
