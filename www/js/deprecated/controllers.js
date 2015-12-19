angular.module('trinibiz.controllers', ['trinibiz.services','ngOpenFB', 'ngStorage'])


.controller("ExampleController", function($scope, DataFactory) {
 
    /*$scope.savePerson = function(firstname,lastname){
      ExampleFactory.savePerson(firstname, lastname);
    }*/

    DataFactory.getCategories().success(function(data){//get categories and process the data
        $scope.categories = data.results;//assign downloaded categories to localStorage
    });


   /* $scope.categories;
    $scope.status;


    getCategories();

    function getCategories(){
      DataFactory.getCategories().success(function(data){
          $scope.categories = data;
      })
      .error(function(error){
        $scope.status = 'Unable to load TriniBiz data' + error.message
      });
    }*/
    
    /*DataFactory.query().success(function(data) {
        scope.categories = data;
    }).catch(function() {
        alert('error');
    });*/

    
    /*$scope.categories = DataFactory.getCategories();
    var l = $scope.categories.length;
    for(i = 0; i < l; i++){
        console.log($scope.categories[i].name);
    }*/

    
    /*$scope.getCategories = function(params){
      DataFactory.getCategories(params); 
    }

    $scope.getBusinesses = function(params){
      DataFactory.getBusinesses(params);
    }*/
    
 
})

/*.controller('AppCtrl', function($scope, StorageService, Category, Business){//initial app controller manages localStorage

    
    $scope.things = null;
    //$scope.things = StorageService.getAll();
    if($scope.things)
      console.log("Storage has sumn");
    else
      console.log("Storage is empty");
    
    $scope.add = function(newThing){
        StorageService.add(newThing);
    }
    $scope.remove = function(thing){
      StorageService.remove(thing);
    }*/

    /*if(!$scope.things){
        Category.getCategories().success(function(data){//get categories and process the data
            $scope.categories = data.results;//assign downloaded categories to localStorage
            $scope.add(this.categories);
        });

        Business.getBusinesses().success(function(data){
            $scope.businesses = data.results;
            $scope.add(this.businesses);
        });
    }*/
//})

.controller('MenuCtrl', function($scope, $ionicModal, $timeout,ngFB) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  //$localStorage.categories = [{"name":"Health","frequency":2}];
  //$localStorage.businesses = [{"name":"Default", "phone":"8687738584"}];

  //$scope.businesses = DataStore.businesses;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login2.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    /*$timeout(function() {
      $scope.closeLogin();
    }, 1000);*/
  };

  $scope.fbLogin = function () {
    ngFB.login({scope: 'email,publish_actions'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                $scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        });
  };
})

.controller('ProfileCtrl', function ($scope, ngFB) {
    ngFB.api({
        path: '/me',
        params: {fields: 'id,name'}
    }).then(
        function (user) {
            $scope.user = user;
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        });
})

.controller('CategoriesCtrl', function($scope, Category, $localStorage) {
  //if(isEmpty($localStorage)){//if the localStorage has no categories stored
    Category.getCategories().success(function(data){//get categories and process the data
        $localStorage.categories = data.results;//assign downloaded categories to localStorage
    });
 // }
  $scope.categories = $localStorage.categories;//data.results;
  //$scope.storage= $localStorage;// if the localStorage has categories this means 
  //it was initialised before. we can safely assign the scope storage variable to the localStorage
  
})

.controller('BusinessesCtrl', function($scope, Business, $localStorage, ngFB){
    if($localStorage.businesses.length == 0){
        Business.getBusinesses().success(function(data){
           $localStorage.businesses = data.results;
           
        });
        $storage.businesses = $localStorage.businesses;

       /* Data.getCategories().success(function(data){
           $localStorage.categories = data.results;
        });*/
    }

   // $scope.storage= $localStorage;
    

    $scope.share = function (event) {
        ngFB.api({
            method: 'POST',
            path: '/me/feed',
            params: {
                message: "I experienced excellent customer service using TriniBiz"
            }
        }).then(
        function () {
            alert('The session was shared on Facebook');
        },
        function () {
            alert('An error occurred while sharing this session on Facebook');
        });
    };
})

/*.controller('storageCtrl', ['$scope', '$localStorage', '$sessionStorage', function($scope, $localStorage, $sessionStorage){
  
  $scope.save = function(){

    $localStorage.categories = $scope.categories;
  }

  $scope.load = function(){
    $scope.categories = $localStorage.categories;
  }

}])*/;

