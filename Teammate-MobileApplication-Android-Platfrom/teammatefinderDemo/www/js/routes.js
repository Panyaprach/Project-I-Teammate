angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('tabsController.newFeed', {
    url: '/newfeed',
    views: {
      'tab1': {
        templateUrl: 'templates/newFeed.html',
        controller: 'newFeedCtrl'
      }
    }
  })

  .state('tabsController.findFriend', {
    url: '/findfriend',
    views: {
      'tab4': {
        templateUrl: 'templates/findFriend.html',
        controller: 'findFriendCtrl'
      }
    }
  })

  .state('tabsController.createYourLobby', {
    url: '/createyourlobby',
    views: {
      'tab5': {
        templateUrl: 'templates/createYourLobby.html',
        controller: 'createYourLobbyCtrl'
      }
    }
  })

  .state('tabsController.findLobby', {
    url: '/findlobby',
    views: {
      'tab2': {
        templateUrl: 'templates/findLobby.html',
        controller: 'findLobbyCtrl'
      }
    }
  })

  .state('tabsController.lobbyDetail', {
    url: '/showlobbydetailtoselect/:id',
    views: {
      'tab2': {
        templateUrl: 'templates/lobbyDetail.html',
        controller: 'lobbyDetailCtrl'
      }
    }
  })

  .state('tabsController.confirmToJoin', {
    url: '/confirmtojoinlobby/:id',
    views: {
      'tab2': {
        templateUrl: 'templates/confirmToJoin.html',
        controller: 'confirmToJoinCtrl'
      }
    }
  })


  .state('tabsController.chatLobby', {
    url: '/chatlobby',
    views: {
      'tab3': {
        templateUrl: 'templates/chatLobby.html',
        controller: 'chatLobbyCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/tabscontroller',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('firstAid', {
    url: '/firstaid',
    templateUrl: 'templates/firstAid.html',
    controller: 'firstAidCtrl'
  })

  .state('firstAidDetail', {
    url: '/showdetailfirstaid/:id',
    templateUrl: 'templates/firstAidDetail.html',
    controller: 'firstAidDetailCtrl'
  })


  .state('notifications', {
    url: '/notifications',
    templateUrl: 'templates/notifications.html',
    controller: 'notificationsCtrl'
  })

  .state('signUp', {
    url: '/Signup/:id/:name/:gender/:email/:picture/:age',
    templateUrl: 'templates/signUp.html',
    controller: 'signUpCtrl'
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'profileCtrl'
  })

  .state('welcome', {
    url: '/login',
    templateUrl: 'templates/welcome.html',
    controller: 'welcomeCtrl'
  })

  .state('tabsController.createYourLobby2', {
    url: '/createYourLobby2/:LocationId',
    views: {
      'tab5': {
        templateUrl: 'templates/createYourLobby2.html',
        controller: 'createYourLobby2Ctrl'
      }
    }
  })

  .state('tabsController.pleaseMarkYourLocation', {
    url: '/showmap',
    views: {
      'tab5': {
        templateUrl: 'templates/pleaseMarkYourLocation.html',
        controller: 'pleaseMarkYourLocationCtrl'
      }
    }
  })

  .state('tabsController.setNameLocation', {
    url: '/confirm',
    views: {
      'tab5': {
        templateUrl: 'templates/setNameLocation.html',
        controller: 'setNameLocationCtrl'
      }
    }
  })

  .state('tabsController.friendDetail', {
    url: '/showfriend/:CId',
    views: {
      'tab4': {
        templateUrl: 'templates/friendDetail.html',
        controller: 'friendDetailCtrl'
      }
    }
  })

  .state('tabsController.selectYourLobby', {
    url: '/showmylobby/:fid',
    views: {
      'tab4': {
        templateUrl: 'templates/selectYourLobby.html',
        controller: 'selectYourLobbyCtrl'
      }
    }
  })

  .state('tabsController.confirmToInvite', {
    url: '/confirmtoinvite/:FId/:LId',
    views: {
      'tab4': {
        templateUrl: 'templates/confirmToInvite.html',
        controller: 'confirmToInviteCtrl'
      }
    }
  })




  .state('lobbyDetail2', {
    url: '/showlobbydetailInNotification/:NId',
    templateUrl: 'templates/lobbyDetail2.html',
    controller: 'lobbyDetail2Ctrl'
  })


  .state('confirmToJoin2', {
    url: '/confirmtojoinInnotification/',
    templateUrl: 'templates/confirmToJoin2.html',
    controller: 'confirmToJoin2Ctrl'
  })

  .state('tabsController.chatRoom', {
    url: '/showchatdetail/:LobbyId',
    views: {
      'tab3': {
        templateUrl: 'templates/chatRoom.html',
        controller: 'chatRoomCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/login')



});
