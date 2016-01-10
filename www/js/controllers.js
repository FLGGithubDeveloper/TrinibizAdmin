angular.module('trinibiz.controllers', ['jett.ionic.filter.bar'])

/*.controller('UpdateProfilePic', function($scope, $ionicActionSheet, $timeout) {

 // Triggered on a button click, or some other target
 $scope.showPicLoad = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: 'Upload Profile Pic' },
     ],
     destructiveText: 'Delete',
     titleText: 'Update Profile Pic',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       return true;
     }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 2000);

 };
});*/

.controller('AppController', function($scope, $ionicFilterBar, $timeout, CategoriesService,ToastService, $ionicLoading, $state) {

  $scope.filterBarInstance = "";
  $scope.filterBarStatus = "clean";
  var scope = this;
  $scope.categories = {};


  function getCategories() {

    var items = [];
    var category = {};
    CategoriesService.getAllCategories().then(function(results) {
      $ionicLoading.hide();
      $scope.categories = results.map(function(c) {
        return {
          "name": c.get("name"),
          "id": c.id,
          "frequency": c.get("frequency")
        }
      });
    }, function(err){
      $ionicLoading.hide();
      ToastService.showToast("Something went wrong while retrieving data ,, please check your connection.");
    });
  }

  $ionicLoading.show();
  getCategories();

  $scope.showFilterBar = function() {
    scope.filterBarInstance = $ionicFilterBar.show({
      items: $scope.categories,
      update: function(filteredItems, filteredText) {
        if(filteredItems.length == 0 && filteredText !== 'undefined'){
         $state.go('app.noresults');
          //$location.path("templates/no-results.html")
        }
        else{
          $scope.categories = filteredItems;
            $scope.filterBarStatus = "dirty";
        }
      },
      filterProperties: ['name']
    });
  }

})

.controller('BusinessListCtrl', function($scope, $state, $stateParams, $ionicFilterBar, USER_ROLES, GUEST_USER, UserService, AppActions, AppViews, BusinessesService, $ionicLoading,ToastService) {

  $scope.can = UserService.can;
  $scope.appActions = AppActions;
  $scope.appViews = AppViews;

  $scope.review = {};
  $scope.businesses = {};
  $scope.filterBarInstance = "";
  $scope.filterBarStatus = "clean";
  var scope = this;
  $scope.title = "All Businesses"

  if ($stateParams.categoryName !== undefined) {
    $scope.title = $stateParams.categoryName;
  }

  if ($stateParams.ownerBusinesses !== undefined) {
    $scope.title = "My Businesses";
  }


  function getBusinesses() {
    return BusinessesService.getBusinesses($stateParams.categoryId,$stateParams.ownerBusinesses).then(function(results) {
      $scope.businesses = results; //the scope goverened by BusinessCtrl has all the businesses downloaded
      $ionicLoading.hide();
    }, function(err){
      $ionicLoading.hide();
      ToastService.showToast("Something went wrong while retrieving data, please check your connection.");
    });

  }

  $ionicLoading.show();
  getBusinesses();

  $scope.showPopup = function(business){
    var myPopup = $ionicPopup.show({
       templateUrl: 'templates/review-popup.html',
       title: 'Enter Review',
       scope: $scope,
       business: business,
       buttons: [
         { text: 'Cancel' },
         {
           text: '<b>Submit</b>',
           type: 'button-positive',
           onTap: function(business) {
             $scope.submitReview(business)
           }
         },
       ]
     });
  }

  $scope.refresh = function(){
    if (scope.filterBarInstance) {
      scope.filterBarInstance();
      scope.filterBarInstance = null;
    }

    var refreshComplete = function(){
      $scope.$broadcast('scroll.refreshComplete');
    }
    if($stateParams.ownerBusinesses){
      getBusinesses().then(refreshComplete,refreshComplete);
    }
  };

  $scope.isOwnerPage = function(){
    if($stateParams.ownerBusinesses) {
      return true;
    }
    return false;
  };

  $scope.showFilterBar = function() {
    scope.filterBarInstance = $ionicFilterBar.show({
      items: $scope.businesses,
      update: function(filteredItems, filteredText) {
        if(filteredText !== 'undefined' && filteredItems.length == 0){
         $state.go('app.noresults');
          //$location.path("templates/no-results.html")
        }else{
          $scope.businesses = filteredItems;
          $scope.filterBarStatus = "dirty";
        }

      },
      filterProperties: ['name']
    });
  };

  $scope.isGuest = function() {
    return UserService.hasRole(USER_ROLES.guest);
  };

  $scope.isAuthenticated = function() {
    return UserService.hasRole(USER_ROLES.user);
  };

  $scope.likeClick = function(business) {
    BusinessesService.likeUnlike(business);
  };

  $scope.toggleReviews = function(){
        if($scope.reviews_display == true){
           $scope.reviews_display = false;
        }
        else{
          $scope.reviews_display = true;
        }
  };

  $scope.submitReview = function(business) {
    BusinessesService.submitReview(business, $scope.review,function(){
			$scope.review = {};
		});
  };

})

.controller('ContactsCtrl', function($scope, $ionicFilterBar, $timeout, ContactsService,ToastService, $ionicLoading, $stateParams) {

  $scope.filterBarInstance = "";
  $scope.filterBarStatus = "clean";
  var scope = this;
  $scope.contacts = {};

  function getContacts() {

    var items = [];
    var contacts = {};
    ContactsService.getContacts($stateParams.businessId).then(function(results) {
      $ionicLoading.hide();
      $scope.contacts = results;
      /*$scope.contacts = result.map(function(c) {
        return {
          "firstName": c.get("firstName"),
          "lastName": c.get("lastName"),
          "email": c.get("email"),
          "phone": c.get("phone")
        }
      });*/
    }, function(err){
      $ionicLoading.hide();
      ToastService.showToast("Something went wrong while retrieving data, please check your connection.");
    });
  }

  $ionicLoading.show();
  getContacts();

  $scope.showFilterBar = function() {
    scope.filterBarInstance = $ionicFilterBar.show({
      items: $scope.contacts,
      update: function(filteredItems, filteredText) {
        if(filteredItems.length == 0 && filteredText !== 'undefined'){
         $state.go('app.noresults');
          //$location.path("templates/no-results.html")
        }
        else{
          $scope.contacts = filteredItems;
            $scope.filterBarStatus = "dirty";
        }
      },
      filterProperties: ['firstName, lastName']
    });
  }

})

.controller('MenuCtrl', function($scope, $location, $ionicHistory, GUEST_USER, USER_ROLES, UserService, AppViews, AppActions, $ionicActionSheet, $timeout) {

  $scope.can = UserService.can;
  $scope.appViews = AppViews;
  $scope.appActions = AppActions;
  $scope.user = UserService.getUser;
  //$scope.profileImageUrl = "assets/\//img/\//categories/\//guestUser.jpg";


  $scope.logOut = function() {
    UserService.logOut();
    $ionicHistory.nextViewOptions({
      disableBack:true
    });
    //$state.go('app.categories');
    $location.path("/app/")
  }

  $scope.isGuest = function() {
    return UserService.hasRole(USER_ROLES.guest);
  }

  $scope.isAuthenticated = function(){
    return UserService.hasRole(USER_ROLES.user);
  }

  $scope.isOwner = function() {
    return UserService.isOwner();
  }

  // Triggered on a button click, or some other target
  $scope.showPicLoad = function() {

    // Show the action sheet
    var hideSheet =  $ionicActionSheet.show({
      /*titleText: 'Update Profile Pic',
      buttons: [
        { text: '<i class="icon ion-upload"></i>Upload Profile Pic' }
      ],

      cancelText: 'Cancel',
      cancel: function() {
           // add cancel code..
         },
      buttonClicked: function(index) {
        return true;
      }*/
    });

    // For example's sake, hide the sheet after two seconds
    $timeout(function() {
      hideSheet();
    }, 4000);

  };

})

.controller('RegistrationCtrl', function($scope, $state, $cordovaOauth, $ionicPlatform,$ionicHistory, UserService, ToastService) {

    $scope.data = {};

    $scope.signupEmail = function() {
      UserService.register($scope.data.firstname, $scope.data.lastname, $scope.data.username, $scope.data.password, $scope.data.username, $scope.data.type)
        .then(function(user) {
          ToastService.showToast('Please check your email to verify your account');
          if($scope.data.type == "Regular"){
            $state.go('app.login');
          }
          else{
            $state.go('app.invite');
          }
          $ionicHistory.nextViewOptions({
         disableBack: true
       });
        }, function(error) {
          $scope.$apply(function(){
            ToastService.showToast(error.message);
          });
        });
    }

    $scope.isAuthenticated = function(){
      return UserService.hasRole(USER_ROLES.user);
    }
  })

.controller('LoginCtrl', function($scope, $state, $cordovaOauth, $ionicPlatform, USER_ROLES, GUEST_USER, $ionicHistory, UserService,ToastService) {

  $scope.data = {};

  $scope.loginEmail = function() {
    UserService.logIn($scope.data.username, $scope.data.password,
      function(user) {
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('app.categories');
        var message = 'Welcome to TriniBiz, '+$scope.data.username+'.';
        $ionicPlatform.ready(function(){
            ToastService.showToast('Welcome to TriniBiz, '+$scope.data.username+'.');
        })

      },
      function(user, error) {
      // The login failed. Check error to see why.
      var message = 'Login error: ' + error.message;
      $ionicPlatform.ready(function(){
          ToastService.showToast('There was an error logging in: '+error.message);
        });
      });

  }

  $scope.toggleFPassword = function(){
        if($scope.fp_display == true){
           $scope.fp_display = false;
        }
        else{
          $scope.fp_display = true;
        }
  };

  $scope.resetPassword = function(email) {
    UserService.resetPassword(email);
  }

  $scope.loginFacebook = function() {

    if (!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())) {
      var message = UserService.loginFacebook();
      $ionicPlatform.ready(function(){
          $cordovaToast(message, 'long', 'center').then(function(success){
            // success
          }, function (error) {
          // error
          });

	    });
    }else { //Native Login
      UserService.loginFacebookMobile();
    }
  }
})

.controller('ProfileCtrl', function($scope) {

})
