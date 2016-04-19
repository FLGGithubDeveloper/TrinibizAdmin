angular.module('trinibiz.routes', []).

config(function($stateProvider, $urlRouterProvider, $ionicFilterBarConfigProvider) {
  $stateProvider

    .state('app', {
      cache: false,
      url: '/app',
      //abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'MenuCtrl',
      resolve : {
        'acl' : ['$q', 'AclService','AppViews', function($q, AclService,AppViews){
          if(AclService.can(AppViews.menu)){
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      }
    })
    .state('app.categories', {
      url: "/categories",
      views: {
        'menuContent': {
          templateUrl: "templates/categories.html",
          controller: 'AppController'
        }
      },
      resolve : {
        'acl' : ['$q', 'AclService','AppViews', function($q, AclService,AppViews){
          if(AclService.can(AppViews.categories)){
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      }
    })
    .state('app.businessNames', {
      url: "/businessNames/:categoryId?categoryName",
      views: {
        'menuContent': {
          templateUrl: "templates/businessNames.html",
          controller: 'BusinessesCtrl'
        }
      },
      resolve : {
        'acl' : ['$q', 'AclService','AppViews', function($q, AclService,AppViews){
          if(AclService.can(AppViews.businessNames)){
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      }
    })
    .state('app.registerBiz', {
      url: '/registerBiz',
      views:{
        'menuContent': {
        templateUrl: 'templates/registerBiz.html',
        controller: 'RegisterBizCtrl'
        }
      },
      resolve : {
        'acl' : ['$q', 'AclService','AppViews', function($q, AclService,AppViews){
          if(AclService.can(AppViews.registerBiz)){
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      }
    })
    .state('app.business', {
      url: "/business/:businessId?businessName",
      views: {
        'menuContent': {
          templateUrl: "templates/business.html",
          controller: 'BusinessDetailsCtrl'
        }
      },
      resolve : {
        'acl' : ['$q', 'AclService','AppViews', function($q, AclService,AppViews){
          if(AclService.can(AppViews.business)){
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      }
    })
    .state('app.userbusinesses', {
      url: "/businessNames/:categoryId?/:categoryName/:ownerBusinesses?",
      views: {
        'menuContent': {
          templateUrl: "templates/businessNames.html",
          controller: 'BusinessesCtrl'
        }
      },
      resolve : {
        'acl' : ['$q', 'AclService','AppViews', function($q, AclService,AppViews){
          if(AclService.can(AppViews.businessNames)){
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      }
    })
    .state('app.allbusinesses', {
      url: "/businessNames",
      views: {
        'menuContent': {
          templateUrl: "templates/businessNames.html",
          controller: 'BusinessDetailsCtrl'
        }
      },
      resolve : {
        'acl' : ['$q', 'AclService','AppViews', function($q, AclService,AppViews){
          if(AclService.can(AppViews.businesses)){
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      }
    })
    .state('app.signup', {
      url: '/signup',
      views: {
        'menuContent': {
          templateUrl: 'templates/signup.html',
          controller: 'RegistrationCtrl',
          //controllerAs: 'SIGNUP'
        }
      },
      resolve : {
        'acl' : ['$q', 'AclService','AppViews', function($q, AclService,AppViews){
          if(AclService.can(AppViews.signup)){
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      }
    })
    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'LOGIN'
        }
      },
      resolve : {
        'acl' : ['$q', 'AclService','AppViews', function($q, AclService,AppViews){
          if(AclService.can(AppViews.login)){
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      }
    })
    .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent': {
          templateUrl: "templates/myCenter.html",
          controller: "ProfileCtrl"
        }
      },
      resolve : {
        'acl' : ['$q', 'AclService','AppViews', function($q, AclService,AppViews){
          if(AclService.can(AppViews.profile)){
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      }
    }).state('app.terms', {
      url: "/terms",
      views: {
        'menuContent': {
          templateUrl: "templates/terms.html",
        }
      },
      resolve : {
        'acl' : ['$q', 'AclService','AppViews', function($q, AclService,AppViews){
          if(AclService.can(AppViews.terms)){
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      }
    }).state('app.invite', {
      url: "/invite",
      views: {
        'menuContent': {
          templateUrl: "templates/invite.html",
        }
      },
      resolve : {
        'acl' : ['$q', 'AclService','AppViews', function($q, AclService,AppViews){
          if(AclService.can(AppViews.invite)){
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      }
    }).state('app.settings', {
      url: "/settings",
      views: {
        'menuContent': {
          templateUrl: "templates/settings.html",
          controller: "MenuCtrl"
        }
      },
      resolve : {
        'acl' : ['$q', 'AclService','AppViews', function($q, AclService,AppViews){
          if(AclService.can(AppViews.settings)){
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      }
    }).state('app.noresults', {
      url: "/noresults",
      views: {
        'menuContent': {
          templateUrl: "templates/no-results.html",
          //controller: "AppController"
        }
      },
      resolve : {
        'acl' : ['$q', 'AclService','AppViews', function($q, AclService,AppViews){
          if(AclService.can(AppViews.noresults)){
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      }
    }).state('app.nobusinesses', {
      url: "/nobusinesses",
      views: {
        'menuContent': {
          templateUrl: "templates/no-businesses.html",
          //controller: "AppController"
        }
      },
      resolve : {
        'acl' : ['$q', 'AclService','AppViews', function($q, AclService,AppViews){
          if(AclService.can(AppViews.nobusinesses)){
            // Has proper permissions
            return true;
          } else {
            // Does not have permission
            return $q.reject('Unauthorized');
          }
        }]
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/categories');
});
