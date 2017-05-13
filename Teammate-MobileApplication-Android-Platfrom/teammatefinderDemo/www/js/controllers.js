var localhost = "172.19.199.253";

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

.controller('selectYourLobbyCtrl', ['$scope', '$stateParams','$state','$http', '$ionicPopup',
function ($scope, $stateParams, $state, $http, $ionicPopup) {
  $scope.fid = $stateParams.fid;
  $scope.getMyLobby = function(){
    $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/joinlobby/cId/1'}).success(function (result) {
        $scope.DataMyLobby = JSON.stringify(result);
        $scope.DataParseMyLobby = JSON.parse($scope.DataMyLobby);
        console.log($scope.DataParseMyLobby);
          }).error(function (data) {
          alert("CON'T CONNECT WEB SERVICES");
      });
  }// get Lobby function


    $scope.ToConfirmInvite = function(lid){
      $scope.lid = lid;
      var confirmPopup = $ionicPopup.confirm({
        title: 'Invite this person to lobby?',
        template: 'Are you sure to invite this person lobby?'
      });
      confirmPopup.then(function(res) {
        if(res) {
          console.log('You are sure');
          $state.go('tabsController.chatLobby');
        } else {
          console.log('You are not sure');
        }
      });
      //$state.go('tabsController.confirmToInvite', {fid:$scope.fid,lid:$scope.lid});
    }
}])

.controller('confirmToInviteCtrl', ['$scope', '$stateParams','$state','$http',
function ($scope, $stateParams, $state,$http) {
  $scope.fid = $stateParams.fid;
  $scope.lid = $stateParams.lid;
  //alert("FID:"+$stateParams.fid+"LID:"+$scope.lid);
  $scope.getMyLobby = function(){
    $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/lobby/'+$scope.lid }).success(function (result) {
        $scope.DataMyLobby = JSON.stringify(result);
        $scope.DataParseMyLobby = JSON.parse($scope.DataMyLobby);
        $scope.nameLobby = $scope.DataParseMyLobby.name;
        $scope.sport = $scope.DataParseMyLobby.sport.name;
        $scope.description = $scope.DataParseMyLobby.description
        $scope.start_date = $scope.DataParseMyLobby.start_date;
        $scope.location = $scope.DataParseMyLobby.location.name;
        console.log($scope.DataParseMyLobby);
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
  $scope.ShowFriendAndLobby = function(){
      $scope.getMyLobby();
      $scope.getFriend();
  }

  $scope.ToConfirmInvite = function(){
      alert("Invited");
      //var fid = $scope.fid;
      //alert("FID:"+$scope.fid+" LID:"+$scope.lid);
      $state.go('tabsController.findFriend');
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


.controller('createYourLobby2Ctrl', ['$scope', '$stateParams','$http','$ionicPopup','$state',
function ($scope, $stateParams,$http,$ionicPopup,$state) {
  $scope.LocationId = $stateParams.LocationId;
  $scope.getLocation = function(){

      $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/location/'+$scope.LocationId}).success(function (result) {

          $scope.dataMedical = JSON.stringify(result);
          $scope.LocationJSON = JSON.parse($scope.dataMedical);
          $scope.LocationName = $scope.LocationJSON.name;

            }).error(function (data) {
            alert("ERROR");
        });
      }
  $scope.ToConfirmCreate= function(){
      //  $scope.lid = lid;
        var confirmPopup = $ionicPopup.confirm({
          title: 'Create Lobby?',
          template: 'Are you sure create lobby?'
        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
            $state.go('tabsController.chatLobby');
          } else {
            console.log('You are not sure');
          }
        });
        //$state.go('tabsController.confirmToInvite', {fid:$scope.fid,lid:$scope.lid});
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
        $scope.ToDetail = function (idR) {
            $scope.idsent = idR;
          //  alert("ID:"+$scope.idsent);
            $state.go('tabsController.lobbyDetail', {id:$scope.idsent});
        };

}])

.controller('lobbyDetailCtrl', ['$scope', '$stateParams','$state','$http','$ionicPopup',
function ($scope, $stateParams, $state, $http, $ionicPopup) {
  $scope.id = $stateParams.id;
  $scope.getLobby = function(){
    $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/lobby/'+$scope.id }).success(function (result) {
        $scope.DataLobby = JSON.stringify(result);
        $scope.DataParseLobby = JSON.parse($scope.DataLobby);
        $scope.name =$scope.DataParseLobby.name;
        $scope.description=$scope.DataParseLobby.description;
        $scope.sport=$scope.DataParseLobby.sport.name;
        //$scope.date=$scope.DataParseLobby.
      //  $scope.time=$scope.DataParseLobby.
        $scope.location=$scope.DataParseLobby.location.name;
          }).error(function (data) {
          alert("CON'T CONNECT WEB SERVICES");
      });
  }// get Lobby function

    $scope.ToConfirm = function (idR) {
        $scope.idsent = idR;
       alert("ID:"+$scope.idsent);
       //$state.go('tabsController.confirmToJoin', {id:$scope.idsent});
    };
    $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Join this lobby?',
       template: 'Are you sure to join this lobby?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
         $state.go('tabsController.chatLobby');
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
       },100)
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
      var request = $http({
          method: "post",
          url: "http://"+localhost+":8080/Teammate-Dev/api-v1/conversation/",
          data:{
              "CId": {
                "CId": 1,
                "aboutme": "",
                "age": 25,
                "birthdate": "2017-03-22T00:00:00",
                "firstname": "MeMee",
                "gender": "2",
                "generateDate": "2017-03-22T01:54:57",
                "image": {
                  "imgId": 12,
                  "path": "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/17309808_107945806409542_5176201472971675964_n.jpg?oh=b0ba1608b771b322fb4eb21fb01c3d86&oe=5971FF5C"
                },
                "lastname": "Susee",
                "status": "Banned",
                "username": "MeMee"
              },
              "conId": "",
              "content": $scope.MessageInput,
              "datesent": "2017-05-02T10:52:03",
              "lbId": {
                "description": "desc",
                "lbId": 2,
                "location": {
                  "byAdmin": true,
                  "latitude": "7.8952957",
                  "lcId": 1,
                  "longitude": "98.3539043",
                  "name": "PSU Phuket Stadium "
                },
                "maxMember": 10,
                "name": "test",
                "sport": {
                  "SId": 1,
                  "name": "Volleyball"
                }
              }
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
          $scope.content = $scope.DataParseJSON.content;
          $scope.description = $scope.DataParseJSON.description;
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
            }).error(function (data) {
            alert("CON'T CONNECT WEB SERVICES");
        });
      }

}])

.controller('welcomeCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])


.controller('lobbyDetail2Ctrl', ['$scope', '$stateParams','$state','$http','$ionicPopup',
function ($scope, $stateParams, $state, $http,$ionicPopup) {
  var id = $stateParams.NId;
  $scope.getNotify = function(){
    //alert("In Function");
      $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/notify/'+id}).success(function (result) {
          $scope.DataNotify = JSON.stringify(result);
          $scope.DataParseNotify = JSON.parse($scope.DataNotify);
          console.log($scope.DataParseNotify);

            }).error(function (data) {
            alert("ERROR");
        });
      }
      $scope.ToShowDetailNotify = function (NId) {
          $scope.idsent = NId;
          var confirmPopup = $ionicPopup.confirm({
            title: 'Join this lobby?',
            template: 'Are you sure to join this lobby?'
          });
          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
              $state.go('tabsController.chatLobby');
            } else {
              console.log('You are not sure');
            }
          });
          //$state.go('lobbyDetail2', {id:$scope.idsent});
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
