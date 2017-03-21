angular.module('app.controllers', ['ngCordova','ngCordovaOauth'])

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
    // alert("Hello "+$stateParams.name+$stateParams.gender+$stateParams.email+$stateParams.age+$stateParams.picture);
    $scope.name = $stateParams.name;
    $scope.gender = $stateParams.gender;
    $scope.email = $stateParams.email;
    $scope.age = $stateParams.age;
    $scope.picture = $stateParams.picture;
})

.controller('newFeedCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
  $scope.adviting = [
          { id:1, title: "Super Sport โปรโมชั่นพิเศษเฉพาะ ช้อปออนไลน์",
          thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/17155229_10155107039069889_6370620400748909226_n.jpg?oh=b0da90077049ddd31dd11056581e4898&oe=5957AEFB",
          detail: "เต็ม Max ทุกวงสวิง! ตีลูกได้เต็มประสิทธิภาพ ร่วมสัมผัสประสบการณ์แบบเทิร์นโปรไปกับ TAYLORMADE ลดราคาสูงสุด 40% วันนี้ - 31 มี.ค. 60 ที่ Supersports Online Shop แค่คลิก  http://goo.gl/Ma4SLH"},
          { id:2, title: "Super Sport โปรโมชั่นพิเศษเฉพาะ ช้อปออนไลน",
          thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/17353480_10155107035184889_6719163814886185717_n.jpg?oh=2dacb61a913389863429c50aaef70cbd&oe=5926310E",
          detail: "เพราะความเบาคือเสน่ห์ที่เรียบง่าย ผสมผสาน เลือกสไตล์ที่ใช่สำหรับคุณกับ NIKE Kaishi 2.0 งานนี้สาวก NIKE ห้ามพลาด ที่ Supersports Online Shop ง่ายๆ แค่คลิก http://bit.ly/2nHN81I"},
          { id:3, title: "Super Sport โปรโมชั่นพิเศษเฉพาะ ช้อปออนไลน์",
          thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/17343009_10155109993179889_3509777815594381621_n.jpg?oh=5e05ee87a49784f1cf7b770d8e51eaf8&oe=59552594",
          detail: "พร้อมให้คุณออกวิ่งได้อย่างมั่นใจ ไปกับ Adidas Pure BOOST Xpose ตอบทุกโจทย์ ทุกสไตล์ ที่เป็นคุณ วันนี้ที่ซูเปอร์สปอร์ต  ส่วนใครสมัครวิ่งงาน Supersports 10 Mile International Run 2017 in Phuket เตรียมตัวกันให้พร้อมแล้วเจอกัน พรุ่งนี้นะ!!"},
          { id:4, title: "Super Sport โปรโมชั่นพิเศษเฉพาะ ช้อปออนไลน์",
          thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/17309273_10155106694674889_7340101034196157630_n.jpg?oh=2a4c36f40b3aa85e6ade87c3abfa477e&oe=5954E3AB",
           detail: "สาวกห้ามพลาด รีบมาช้อปก่อนหมด กับเสื้อ West ham United Sale 30% วันนี้ – 31 มี.ค. 60 บอกเลยของมีจำนวนจำกัด อย่าช้า อดไม่รู้ด้วยนะ"}
    ];

}])

.controller('findFriendCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
  $scope.friends = [
          { id:1, title: "Jatuwit Pitakdansakul", thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/16831125_1327430143980127_563340370637500068_n.jpg?oh=35499672b507a02c98da041e4dfb2440&oe=595DB2C1", age: "21", sport: "Football,Basketball"},
          { id:2, title: "Sutita Saraya", thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/14034880_1073722982747883_2869991271281568838_n.jpg?oh=927c2872a2d6fe292dd9b145bd374b8e&oe=59607725", age: "21", sport: "Badminton,Tennis"},
          { id:3, title: "Panuwat Buranaprapan", thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-1/13118865_985332761521271_1909429602424591229_n.jpg?oh=31e23192e0b07c0a9502b65caf5afe67&oe=5961FA44", age: "20", sport: "Table Tennis,Basketball"},
          { id:4, title: "Tunyared Khiawthong", thumbnail: "https://scontent.fbkk10-1.fna.fbcdn.net/v/t31.0-1/c212.0.960.960/p960x960/16601915_1216024748444583_969956501348332975_o.jpg?oh=31e0d56121668e4e7acd304417734a8a&oe=5961B4B9", age: "21", sport: "Football,Basketball"}
    ];

}])

.controller('createYourLobbyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('findLobbyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('chatLobbyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('firstAidCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
  $scope.practices = [
          { id:1, title: "กระดูกต้นแขนหักตอนกลาง",
          thumbnail: "https://www.doctor.or.th/sites/default/files/21-013.1.jpg",
          detail: "วิธีปฏิบัติ: ใช้เฝือกไม้ขนาดกว้าง 1 นิ้ว ใส่ตั้งแต่ไหล่ถึงข้อศอก ทาบที่ด้านนอกและด้านในของแขน(อาจใช้ที่ด้านหน้าและด้านหลังด้วย) ใช้ผ้าพันเป็นเปลาะแขวนข้อมือไว้ให้ติดกับคอด้วยผ้าสามเหลี่ยม ปล่อยข้อศอกให้ห้อยลง"},
          { id:2, title: "กระดูกต้นแขนหัก (ใต้ไหล่)",
          thumbnail: "http://4.bp.blogspot.com/-uuqGltQ4FQY/U8Dii8ujSlI/AAAAAAAAPMM/fNLhhJHxRME/s1600/artery-studios-shoulder-injuries.jpg",
          detail: "วิธีปฏิบัติ:	ให้แขนข้างนั้นอยู่แนบตัว ใช้ผ้าผืนใหญ่พันรอบแขนข้างนั้นไปผูกด้านข้างของทรวงอกตอนใต้รักแร้ข้างที่ดี แล้วห้อยแขนข้างเจ็บด้วยผ้าคล้องคอ"},
          { id:3, title: "การจับชีพจร",
          thumbnail: "https://img.kapook.com/u/kantana/health%20(5)_10.jpg",
          detail: "ตำแหน่งที่จับตำแหน่งที่สัมผัสชีพจรได้ก็คือ บริเวณที่เส้นเลือดแดงไหลผ่าน ตำแหน่งที่สามารถจับได้สะดวก คือ 	ที่ข้อมือ (ส่วนที่นิ้วหัวแม่มือด้านในเป็นบริเวณที่นิยมจับมากกว่าที่อื่นๆ)ที่ลำคอ (ด้านข้าง) ที่ขมับ (ซ้าย - ขวา)  ที่ขาหนีบ (ทั้ง 2 ข้าง)ที่ข้อพับแขน (เหนือข้อศอกติดกับลำตัว)ที่ใต้หัวเข่าพับ บนหลังเท้า (ด้านนิ้วหัวแม่เท้า) วิธีจับชีพจร: เตรียมนาฬิกาชนิดที่มีเข็มบอกวินาที  ใช้นิ้ว 3 นิ้ว คือ นิ้วชี้ นิ้วกลาง และนิ้วนาง กดลงบนเส้นเลือด ในตำแหน่งที่ต้องการวัด จับชีพจรภายใน  1 นาที ว่าเต้นกี่ครั้ง (จดไว้) อย่าใช้นิ้วมือกดแรงจนเกินไป ห้ามใช้นิ้วหัวแม่มือจับชีพจร เพราะไม่สามารถนับชีพจรได้แน่ชัด ก่อนจับชีพจร ควรให้ตำแหน่งที่จะจับหรืออวัยวะส่วนนั้นอยู่ในลักษณะพัก หรือวางแล้วหมุนเสียก่อนก็ได้"}
    ];
    //$state.go('firstAidDetail', {id:$scope.fbid});

}])
.controller('firstAidDetailCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
.controller('notificationsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])



.controller('profileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('welcomeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('selectLocationCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('pleaseMarkYourLocationCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicLoading) {
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

.controller('setNameLocationCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('friendDetailCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('selectYourLobbyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('confirmToInviteCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])



.controller('lobbyDetailCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('lobbyDetail2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('confirmToJoinCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('confirmToJoin2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('chatRoomCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
