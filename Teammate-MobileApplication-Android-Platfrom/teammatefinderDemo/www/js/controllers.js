var localhost = "172.19.236.227";

angular.module('app.controllers', ['ngCordova','ngCordovaOauth','ion-datetime-picker'])

.controller('FacebookCtrl', function($scope,$http,$cordovaOauth,$location,$state){
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
           $state.go('signUp', {id:$scope.fbid,name:$scope.name,gender:$scope.gender,email:$scope.email,picture:$scope.picture,age:$scope.age_range});
         });

     }, function(error) {
         console.log(error);
     });
     };

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
          //console.log(JSON.stringify(result));
            //console.log($scope.DataParse);

          //console.log("Data"+$scope.dataAdver);
          //alert(" Data "+$scope.dataAdver);
            }).error(function (data) {
            alert("CON'T CONNECT WEB SERVICES");
        });
      }
      /*
  $scope.advertise = [
          { id:1, content: "Super Sport โปรโมชั่นพิเศษเฉพาะ ช้อปออนไลน์",
          path: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/17155229_10155107039069889_6370620400748909226_n.jpg?oh=b0da90077049ddd31dd11056581e4898&oe=5957AEFB",
          description: "เต็ม Max ทุกวงสวิง! ตีลูกได้เต็มประสิทธิภาพ ร่วมสัมผัสประสบการณ์แบบเทิร์นโปรไปกับ TAYLORMADE ลดราคาสูงสุด 40% วันนี้ - 31 มี.ค. 60 ที่ Supersports Online Shop แค่คลิก  http://goo.gl/Ma4SLH"},
          { id:2, content: "Super Sport โปรโมชั่นพิเศษเฉพาะ ช้อปออนไลน",
          path: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/17353480_10155107035184889_6719163814886185717_n.jpg?oh=2dacb61a913389863429c50aaef70cbd&oe=5926310E",
          description: "เพราะความเบาคือเสน่ห์ที่เรียบง่าย ผสมผสาน เลือกสไตล์ที่ใช่สำหรับคุณกับ NIKE Kaishi 2.0 งานนี้สาวก NIKE ห้ามพลาด ที่ Supersports Online Shop ง่ายๆ แค่คลิก http://bit.ly/2nHN81I"},
          { id:3, content: "Super Sport โปรโมชั่นพิเศษเฉพาะ ช้อปออนไลน์",
          path: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/17343009_10155109993179889_3509777815594381621_n.jpg?oh=5e05ee87a49784f1cf7b770d8e51eaf8&oe=59552594",
          description: "พร้อมให้คุณออกวิ่งได้อย่างมั่นใจ ไปกับ Adidas Pure BOOST Xpose ตอบทุกโจทย์ ทุกสไตล์ ที่เป็นคุณ วันนี้ที่ซูเปอร์สปอร์ต  ส่วนใครสมัครวิ่งงาน Supersports 10 Mile International Run 2017 in Phuket เตรียมตัวกันให้พร้อมแล้วเจอกัน พรุ่งนี้นะ!!"},
          { id:4, content: "Super Sport โปรโมชั่นพิเศษเฉพาะ ช้อปออนไลน์",
          path: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/17309273_10155106694674889_7340101034196157630_n.jpg?oh=2a4c36f40b3aa85e6ade87c3abfa477e&oe=5954E3AB",
           description: "สาวกห้ามพลาด รีบมาช้อปก่อนหมด กับเสื้อ West ham United Sale 30% วันนี้ – 31 มี.ค. 60 บอกเลยของมีจำนวนจำกัด อย่าช้า อดไม่รู้ด้วยนะ"}
    ];
*/
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
              //console.log($scope.DataParseCustomer);
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
      //alert("ID"+$scope.id);
      /*
      $scope.friends1 = [{ id:1, title: "Jatuwit Pitakdansakul", thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/16831125_1327430143980127_563340370637500068_n.jpg?oh=35499672b507a02c98da041e4dfb2440&oe=595DB2C1", age: "21", sport: "Football,Basketball"}];
      $scope.friends2 =[{ id:2, title: "Sutita Saraya", thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/14034880_1073722982747883_2869991271281568838_n.jpg?oh=927c2872a2d6fe292dd9b145bd374b8e&oe=59607725", age: "21", sport: "Badminton,Tennis"}];
      $scope.friends3 =[{ id:3, title: "Panuwat Buranaprapan", thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-1/13118865_985332761521271_1909429602424591229_n.jpg?oh=31e23192e0b07c0a9502b65caf5afe67&oe=5961FA44", age: "20", sport: "Table Tennis,Basketball"}];
      $scope.friends4 =[{ id:4, title: "Tunyared Khiawthong", thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t31.0-1/c212.0.960.960/p960x960/16601915_1216024748444583_969956501348332975_o.jpg?oh=31e0d56121668e4e7acd304417734a8a&oe=5961B4B9", age: "21", sport: "Football,Basketball"}];

      if($scope.id==1) $scope.show = $scope.friends1;
      if($scope.id==2) $scope.show = $scope.friends2;
      if($scope.id==3) $scope.show = $scope.friends3;
      if($scope.id==4) $scope.show = $scope.friends4;
      */

}])

.controller('selectYourLobbyCtrl', ['$scope', '$stateParams','$state',
function ($scope, $stateParams, $state) {

  $scope.fid = $stateParams.fid;
    //alert("FID :"+$scope.fid);
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

    $scope.ToConfirmInvite = function(lid){
      $scope.lid = lid;
      //var fid = $scope.fid;
      //alert("FID Select You Lobby:"+$scope.fid+" LID:"+$scope.lid);
      $state.go('tabsController.confirmToInvite', {fid:$scope.fid,lid:$scope.lid});
    }
}])

.controller('confirmToInviteCtrl', ['$scope', '$stateParams','$state','$http',
function ($scope, $stateParams, $state,$http) {
  $scope.fid = $stateParams.fid;
  $scope.lid = $stateParams.lid;
  //alert("FID:"+$stateParams.fid+"LID:"+$scope.lid);
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
    $scope.ToConfirmInvite = function(){
      alert("Invited");
      //var fid = $scope.fid;
      //alert("FID:"+$scope.fid+" LID:"+$scope.lid);
      $state.go('tabsController.findFriend');
    }
    /*
    $scope.friends1 = [{ id:1, title: "Jatuwit Pitakdansakul", thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/16831125_1327430143980127_563340370637500068_n.jpg?oh=35499672b507a02c98da041e4dfb2440&oe=595DB2C1", age: "21", sport: "Football,Basketball"}];
    $scope.friends2 =[{ id:2, title: "Sutita Saraya", thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/14034880_1073722982747883_2869991271281568838_n.jpg?oh=927c2872a2d6fe292dd9b145bd374b8e&oe=59607725", age: "21", sport: "Badminton,Tennis"}];
    $scope.friends3 =[{ id:3, title: "Panuwat Buranaprapan", thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-1/13118865_985332761521271_1909429602424591229_n.jpg?oh=31e23192e0b07c0a9502b65caf5afe67&oe=5961FA44", age: "20", sport: "Table Tennis,Basketball"}];
    $scope.friends4 =[{ id:4, title: "Tunyared Khiawthong", thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t31.0-1/c212.0.960.960/p960x960/16601915_1216024748444583_969956501348332975_o.jpg?oh=31e0d56121668e4e7acd304417734a8a&oe=5961B4B9", age: "21", sport: "Football,Basketball"}];

    if($scope.fid==1) $scope.show = $scope.friends1;
    if($scope.fid==2) $scope.show = $scope.friends2;
    if($scope.fid==3) $scope.show = $scope.friends3;
    if($scope.fid==4) $scope.show = $scope.friends4;
    */
}])

.controller('createYourLobbyCtrl', ['$scope', '$stateParams','$http',
function ($scope, $stateParams,$http) {
  //$scope.lcid=$stateParams.lcid;
  //$scope.lcname=$stateParams.lcname;
  $scope.lcid="null"
  $scope.lcname="start"
  //$scope.description ="อะไรเอ่ย";
  $scope.lbId = null;
  $scope.byAdmin ="1";
  $scope.latitude = "7.89460399";
  $scope.lcId = "null";
  $scope.longitude = "8.3526705";
  $scope.lname = "PSU Phuket Stadium "
  $scope.maxMember= 5;
  $scope.SId = 1;
  $scope.Sname = "Volleyball";
  $scope.submit_data = function(){
      var request = $http({
                 method: "post",
                 url: "http://"+localhost+":8080/Teammate-Dev/api-v1/lobby/",
                 data: {
                    description: $scope.lcid,
                    lbId:   $scope.lbId,
                    location: {
                    byAdmin: true,
                    latitude: "7.8952957",
                    lcId: 1,
                    longitude: "98.3539043",
                    name: "PSU Phuket Stadium "
                    },
                    maxMember: $scope.maxMember,
                    name: "Hello Teammate Finder",
                    sport: {
                    SId: 1,
                    name: "Volleyball"
                    }
                 },
                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             });
             request.success(function (data) {
                 $scope.message = "Console : "+data;
                 alert("Success");
             });
             request.error(function(data){
                  $scope.message = "Console :"+data;
                  alert("Error");
             });
           }
    var imagepost = {

    };
    $scope.submit_data2 = function(){
             var request = $http({
                 method: "post",
                 url: "http://"+localhost+":8080/Teammate-Dev/api-v1/image/",
                 data: {
                      imgId: "null",
                      path: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/17499302_1260693963977661_6336429996970633090_n.jpg?oh=b85f7826b13cd438297d331bee78aec0&oe=5979BF66"
                     },
                 headers: { 'Content-Type': 'application/json' }
             });
             request.success(function (data) {
                 $scope.message = "Console : "+data;
                 alert("Success");
             });
             request.error(function(data){
                 $scope.message = "Console :"+data;
                 console.log($scope.message);
                 alert("Error");
             });
           }
}])


.controller('selectLocationCtrl', ['$scope', '$stateParams','$http',
function ($scope, $stateParams,$http) {

  $scope.getLocation = function(){
    //alert("In Function");
      $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/location/'
    }).success(function (result) {
        //alert("ID 1:"+id);
      //  alert("In Function2");
          $scope.dataMedical = JSON.stringify(result);
          $scope.LocationJSON = JSON.parse($scope.dataMedical);
          //$scope.MId = $scope.DataParseJSON.MId;
        //  $scope.content = $scope.DataParseJSON.content;
        //  $scope.description = $scope.DataParseJSON.description;
        //  $scope.imgId = $scope.DataParseJSON.imgId.path;
        //  console.log(''+$scope.imgId);
        //  alert("In Function3");


          //    console.log($scope.DataParseJSON);
          //alert(" Data "+$scope.dataAdver);
            }).error(function (data) {
            alert("ERROR");
        });
      }

}])

.controller('pleaseMarkYourLocationCtrl', ['$scope', '$stateParams','$ionicLoading','$compile',
function ($scope, $stateParams, $ionicLoading, $compile) {


    $scope.mapCreated = function(map) {
          $scope.map = map;
    };

    $scope.centerOnMe = function () {
        console.log("Centering");
          if (!$scope.map) {
            return;
          }

    $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

    navigator.geolocation.getCurrentPosition(function (pos) {
        console.log('Got pos', pos);
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
    }, function (error) {
          alert('Unable to get location: ' + error.message);
    });
  };

}])

.controller('setNameLocationCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])

.controller('findLobbyCtrl', ['$scope', '$stateParams','$state','$http',
function ($scope, $stateParams, $state, $http) {
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
        $scope.ToDetail = function (idR) {
            $scope.idsent = idR;
          //  alert("ID:"+$scope.idsent);
            $state.go('tabsController.lobbyDetail', {id:$scope.idsent});
        };

}])

.controller('lobbyDetailCtrl', ['$scope', '$stateParams','$state','$http',
function ($scope, $stateParams, $state,$http) {
  $scope.id = $stateParams.id;
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

    $scope.ToConfirm = function (idR) {
        $scope.idsent = idR;
       //alert("ID:"+$scope.idsent);
       $state.go('tabsController.confirmToJoin', {id:$scope.idsent});
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

.controller('chatLobbyCtrl', ['$scope', '$stateParams','$http',
function ($scope, $stateParams,$http) {
  $scope.getMyLobby = function(){
      $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/joinlobby/1' }).success(function (result) {
          $scope.MyLobbyData = JSON.stringify(result);
          $scope.DataParseMyLobby = JSON.parse($scope.MyLobbyData);
          $scope.JoinId = $scope.DataParseMyLobby.joinId;
          $scope.LobbyName = $scope.DataParseMyLobby.lbId.name;

          console.log($scope.JoinId + $scope.LobbyName);
            }).error(function (data) {
            alert("CON'T CONNECT WEB SERVICES");
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
        //alert("ID 1:"+id);
      //  alert("In Function2");
          $scope.dataMedical = JSON.stringify(result);
          $scope.DataParseJSON = JSON.parse($scope.dataMedical);
          $scope.MId = $scope.DataParseJSON.MId;
          $scope.content = $scope.DataParseJSON.content;
          $scope.description = $scope.DataParseJSON.description;
          $scope.imgId = $scope.DataParseJSON.imgId.path;
        //  console.log(''+$scope.imgId);
        //  alert("In Function3");


          //    console.log($scope.DataParseJSON);
          //alert(" Data "+$scope.dataAdver);
            }).error(function (data) {
            alert("ERROR");
        });

      }
      /*
    $scope.practices1 = [
          { id:1, content: "กระดูกต้นแขนหักตอนกลาง",
          thumbnail: "https://www.doctor.or.th/sites/default/files/21-013.1.jpg",
          description: "วิธีปฏิบัติ: ใช้เฝือกไม้ขนาดกว้าง 1 นิ้ว ใส่ตั้งแต่ไหล่ถึงข้อศอก ทาบที่ด้านนอกและด้านในของแขน(อาจใช้ที่ด้านหน้าและด้านหลังด้วย) ใช้ผ้าพันเป็นเปลาะแขวนข้อมือไว้ให้ติดกับคอด้วยผ้าสามเหลี่ยม ปล่อยข้อศอกให้ห้อยลง"}];
      $scope.practices2 =[{ id:2, content: "กระดูกต้นแขนหัก (ใต้ไหล่)",
      thumbnail: "http://4.bp.blogspot.com/-uuqGltQ4FQY/U8Dii8ujSlI/AAAAAAAAPMM/fNLhhJHxRME/s1600/artery-studios-shoulder-injuries.jpg",
      description: "วิธีปฏิบัติ:	ให้แขนข้างนั้นอยู่แนบตัว ใช้ผ้าผืนใหญ่พันรอบแขนข้างนั้นไปผูกด้านข้างของทรวงอกตอนใต้รักแร้ข้างที่ดี แล้วห้อยแขนข้างเจ็บด้วยผ้าคล้องคอ"}];
      $scope.practices3=[{ id:3, content: "การจับชีพจร",
      thumbnail: "https://img.kapook.com/u/kantana/health%20(5)_10.jpg",
      description: "ตำแหน่งที่จับตำแหน่งที่สัมผัสชีพจรได้ก็คือ บริเวณที่เส้นเลือดแดงไหลผ่าน ตำแหน่งที่สามารถจับได้สะดวก คือ 	ที่ข้อมือ (ส่วนที่นิ้วหัวแม่มือด้านในเป็นบริเวณที่นิยมจับมากกว่าที่อื่นๆ)ที่ลำคอ (ด้านข้าง) ที่ขมับ (ซ้าย - ขวา)  ที่ขาหนีบ (ทั้ง 2 ข้าง)ที่ข้อพับแขน (เหนือข้อศอกติดกับลำตัว)ที่ใต้หัวเข่าพับ บนหลังเท้า (ด้านนิ้วหัวแม่เท้า) วิธีจับชีพจร: เตรียมนาฬิกาชนิดที่มีเข็มบอกวินาที  ใช้นิ้ว 3 นิ้ว คือ นิ้วชี้ นิ้วกลาง และนิ้วนาง กดลงบนเส้นเลือด ในตำแหน่งที่ต้องการวัด จับชีพจรภายใน  1 นาที ว่าเต้นกี่ครั้ง (จดไว้) อย่าใช้นิ้วมือกดแรงจนเกินไป ห้ามใช้นิ้วหัวแม่มือจับชีพจร เพราะไม่สามารถนับชีพจรได้แน่ชัด ก่อนจับชีพจร ควรให้ตำแหน่งที่จะจับหรืออวัยวะส่วนนั้นอยู่ในลักษณะพัก หรือวางแล้วหมุนเสียก่อนก็ได้"}];
      if($scope.id==1) $scope.show = $scope.practices1;
      if($scope.id==2) $scope.show = $scope.practices2;
      if($scope.id==3) $scope.show = $scope.practices3;
      */
}])

.controller('notificationsCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


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


.controller('lobbyDetail2Ctrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


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

.controller('chatRoomCtrl', ['$scope', '$stateParams','$http','$state','$timeout',
function ($scope, $stateParams, $http,$state,$timeout) {
  $scope.getMessage = function(){
      $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/conversation/lobby/2' }).success(function (result) {
          $scope.ChatRoomData = JSON.stringify(result);
          $scope.DataParse = JSON.parse($scope.ChatRoomData);
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
        $http({ method: 'GET', url: 'http://'+localhost+':8080/Teammate-Dev/api-v1/lobby/2' }).success(function (result) {
              $scope.LobbyData = JSON.stringify(result);
              $scope.DataParseLobby = JSON.parse($scope.LobbyData);
              }).error(function (data) {
              alert("CON'T CONNECT WEB SERVICES");
            });
          }
    $scope.MessageInput ="";
    $scope.PostMessage = function(){
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
          headers: { 'Content-Type': 'application/json; charset=UTF-8' }
      });
      request.success(function (data) {
          $scope.message = "Console : "+data;
          alert("Success");
          //$state.go("/showchatdetail");
      });
      request.error(function(data){
          $scope.message = "Console :"+data;
          console.log($scope.message);
          alert("Error");
      });
    }

}])
