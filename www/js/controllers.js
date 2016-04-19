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

.controller('AppController', function($scope, $ionicFilterBar, $ionicScrollDelegate, $timeout, CategoriesService,ToastService, $ionicLoading, $state) {

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
        //  "frequency": c.get("frequency")
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
    $ionicScrollDelegate.scrollTop();
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

.controller('BusinessesCtrl', function($scope, $ionicFilterBar, $ionicScrollDelegate, $timeout, BusinessesService,ToastService, $ionicLoading, $state, $stateParams) {

  $scope.filterBarInstance = "";
  $scope.filterBarStatus = "clean";
  var scope = this;
  $scope.businesses = {};
    $scope.title = "All Businesses"

  if ($stateParams.categoryName !== undefined) {
    $scope.title = $stateParams.categoryName;
  }

  if ($stateParams.ownerBusinesses !== undefined) {
    $scope.title = "My Businesses";
  }

  var isSProvider = function(){
  //  console.log(business.type);
    return $scope.business.type == "service provider";//return BusinessesService.isSProvider(business);
  }

  var isBusiness = function(){
    //console.log(business.type);
    return $scope.business.type == "owner";//return BusinessesService.isBusiness(business);
  }

  $scope.isBlank = function(attribute){
    if (attribute == "none" || attribute == "" || attribute === undefined)
      return true;
    return false;
  }

  var noBusinesses = function()
  {
    if($scope.businesses.length() == 0){
      return true;
    }else{
      return false;
    }
  }

  function getBusinesses() {

    var items = [];
    var business = {};
    BusinessesService.getBusinesses($stateParams.categoryId, $stateParams.ownerBusinesses).then(function(results) {
      $ionicLoading.hide();
      $scope.businesses = results;
    }, function(err){
      $ionicLoading.hide();
      ToastService.showToast("Something went wrong while retrieving businesses, please check your connection.");
    });
  }

  $ionicLoading.show();
  getBusinesses();

    $scope.showFilterBar = function() {
      $ionicScrollDelegate.scrollTop();
      scope.filterBarInstance = $ionicFilterBar.show({
      items: $scope.businesses,
      update: function(filteredItems, filteredText) {
        if(filteredItems.length == 0 && filteredText !== 'undefined'){
         $state.go('app.noresults');
          //$location.path("templates/no-results.html")
        }
        else{
            $scope.businesses = filteredItems;
            $scope.filterBarStatus = "dirty";
        }
      },
      filterProperties: ['name']
    });
  }

})

.controller('BusinessDetailsCtrl', function($scope, $state, $stateParams, $ionicFilterBar, USER_ROLES, GUEST_USER, UserService, AppActions, AppViews, BusinessesService, $ionicLoading,ToastService, $cordovaEmailComposer) {

  $scope.can = UserService.can;
  $scope.appActions = AppActions;
  $scope.appViews = AppViews;

  // set the rate and max variables
  $scope.review = {};
  $scope.review.rating = 3;
  $scope.review.max = 5;
  $scope.readOnly = true;
  $scope.businesses = {};


  if ($stateParams.businessName !== undefined) {
    $scope.title = $stateParams.businessName;
  }

  $scope.openInAppBrowser = function(website)
  {
      // Open in external browser
      //window.open(website,'_system','location=yes');
      window.open(website,'_blank');
  };


  function getBusinessDetails() {
    return BusinessesService.getBusinessDetails($stateParams.businessId).then(function(results) {
      $scope.businesses = results; //the scope goverened by BusinessCtrl has all the businesses downloaded
      $ionicLoading.hide();
    }, function(err){
      $ionicLoading.hide();
      ToastService.showToast("Something went wrong while retrieving data, please check your connection.");
    });

  }

  $ionicLoading.show();
  getBusinessDetails();

  $scope.refresh = function(){

    var refreshComplete = function(){
      $scope.$broadcast('scroll.refreshComplete');
    }

  };

  $scope.isBlank = function(attribute){
    if (attribute == "none" || attribute == "" || attribute === undefined){
      return true;
    }
    else{
        return false;
    }
  }

  $scope.isOwnerPage = function(){
    if($stateParams.ownerBusinesses) {
      return true;
    }
    return false;
  };

  $scope.isGuest = function() {
    return UserService.hasRole(USER_ROLES.guest);
  };

  $scope.isAuthenticated = function() {
    return UserService.hasRole(USER_ROLES.user)|| UserService.hasRole(USER_ROLES.sprovider)||
    UserService.hasRole(USER_ROLES.owner);
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

  $scope.email = function(){
    email = {

  	to: 'futurelineglobal@gmail.com',
  	subject: 'A test email',
  	body: 'Does this work?'
  }

  if (window.cordova && window.cordova.plugins) {
        $cordovaEmailComposer.isAvailable().then(function () {
             $cordovaEmailComposer.open(email).then(null, function () {

             });
        	}, function () {
         alert('email is no go')
         });
   } else alert('no cordova')

 };

  $scope.xmail = function() {
    document.addEventListener("deviceready", function () {          $cordovaEmailComposer.isAvailable().then(function() {
      alert("email available");
    }, function () {
      alert = ("email not available");
    });
    var email = {
      to: 'futurelineglobal@gmail.com',
      cc: 'flanders.tremayne@gmail.com',
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    };
    $cordovaEmailComposer.open(email).then(null, function () {
      alert("email not sent");
    });
  }, false);
}

  $scope.sendEmail = function(email){
   if(window.plugins && window.plugins.emailComposer){
      window.plugins.emailComposer.showEmailComposerWithCallback(function(result){
          ToastService.showToast("Email launched");
      },
            null, // Subject
            null,                      // Body
            [email],    // To
            null,                    // CC
            null,                    // BCC
            false,                   // isHTML
            null,                    // Attachments
            null);                  // Attachment Data
      //  ToastService.showToast("Email launched");
    }
  }
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

  var deploy = new Ionic.Deploy();

  // Update app code with new release from Ionic Deploy
  $scope.doUpdate = function() {
    deploy.update().then(function(res) {
      console.log('Ionic Deploy: Update Success! ', res);
    }, function(err) {
      console.log('Ionic Deploy: Update error! ', err);
    }, function(prog) {
      console.log('Ionic Deploy: Progress... ', prog);
    });
  };

  // Check Ionic Deploy for new code
  $scope.checkForUpdates = function() {
    console.log('Ionic Deploy: Checking for updates');
    deploy.check().then(function(hasUpdate) {
      console.log('Ionic Deploy: Update available: ' + hasUpdate);
      $scope.hasUpdate = hasUpdate;
    }, function(err) {
      console.error('Ionic Deploy: Unable to check for updates', err);
    });
  }


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
    return UserService.hasRole(USER_ROLES.user)|| UserService.hasRole(USER_ROLES.sprovider)||
    UserService.hasRole(USER_ROLES.owner);
  }

  $scope.isOwner = function() {
    return UserService.isOwner();
  }

  $scope.isSProvider = function() {
    return UserService.isSProvider();
  }

  $scope.isRegular = function() {
    return UserService.hasRole(USER_ROLES.user);
  }

  $scope.isSupplier = function(){
    return UserService.isSProvider() || UserService.isOwner();
  };

})

.controller('RegisterBizCtrl', function($scope, $state,$ionicHistory, ToastService,CategoriesService, UserService,BusinessesService,$ionicLoading){

  $scope.data = {};
  $scope.categories = {};
  $scope.userTypeList = [
  { text: "Business Owner", value: "owner" },
  { text: "Service Provider", value: "sprovider" }
];

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

  getCategories();


  $scope.registerBiz = function(){
    var owner_id = UserService.getUserId();

    BusinessesService.registerBiz(owner_id, $scope.data.usertype,$scope.data.category.id,$scope.data.name,$scope.data.street,$scope.data.address1, $scope.data.city, $scope.data.email,$scope.data.phone,$scope.data.mphone,$scope.data.fax,$scope.data.website,$scope.data.facebook,$scope.data.services);
      $ionicHistory.nextViewOptions({
        disableBack:true
      });
    /*  ToastService.showToast("Your business has been successfully registered, with TriniBiz. The next time you log in your profile will be updated.");*/
      $state.go('app.categories');

  }

})
.controller('RegistrationCtrl', function($scope, $state, $cordovaOauth, $ionicPlatform,$ionicHistory, UserService, ToastService) {

    $scope.data = {};


    $scope.signupEmail = function() {
      UserService.register($scope.data.firstname, $scope.data.lastname, $scope.data.username, $scope.data.password, $scope.data.username)
        .then(function(user) {
        /*  ToastService.showToast('Please check your email to verify your account');*/
            $state.go('app.login');
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
      return UserService.hasRole(USER_ROLES.user)|| UserService.hasRole(USER_ROLES.sprovider)||
      UserService.hasRole(USER_ROLES.owner);
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
      /*  if(UserService.emailVerified() == undefined){
          UserService.logOut();
          $ionicHistory.nextViewOptions({
            disableBack:true
          });
          $state.go('app.login');
        //  $location.path("/app/");

          var message = 'You received a confirmation email when you signed up for TriniBiz, but you have not confirmed your email. Please do verify your email, by visiting the confirmation email and clicking on the Confirm Email link';
          $ionicPlatform.ready(function(){
              //ToastService.showToast(message);
              alert(message);
          })

        }*///else{
          $state.go('app.categories');
          /*if(UserService.isOwner() || UserService.isSProvider()){
            $state.go('app.categories');
          }
          else{
            $state.go('app.registerBiz');
          }*/

          var message = 'Welcome to TriniBiz, '+$scope.data.username+'.';
          $ionicPlatform.ready(function(){
              ToastService.showToast(message);
          })
        //}
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
