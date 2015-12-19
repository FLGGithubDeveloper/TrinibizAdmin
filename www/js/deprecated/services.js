'use strict';

var categories = ['$http', 'PARSE_CREDENTIALS', '$localStorage', function($http,PARSE_CREDENTIALS,$localStorage){

    var url = 'https://api.parse.com/1/classes/BusinessCategory';

    return{

        getCategories:function(){
            var categories =  $http.get(url,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
            return categories;
        }

    }

}];

var businesses = ['$http', 'PARSE_CREDENTIALS', function($http,PARSE_CREDENTIALS){

    var url = 'https://api.parse.com/1/classes/Business';

    return{

        getBusinesses:function(){
            var businesses = $http.get(url,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
            return businesses;
            
        }

    }

}];

//uses the Angular resource module to provide access to 
//the REST services at the specified endpoint:

angular.module('trinibiz.services', ['ngStorage']).

value('PARSE_CREDENTIALS',{
    APP_ID: 'Xf0pO13G4G4nM3Y0yh39Iup7XmwL1tdh9yTiYygP',
    REST_API_KEY:'aJfGXiVW1hTid3SdtLrBWKOLU29qM3qMMEyGAIft'
})

/*.factory('ExampleFactory', function(){
    return{
        savePerson:function(firstname, lastname) {
            var PeopleObject = Parse.Object.extend("PeopleObject");
            var person = new PeopleObject();
            person.set("firstname", firstname);
            person.set("lastname", lastname);
            person.save(null, {});
        }

        getPeople:function(params) {
            var PeopleObject = Parse.Object.extend("PeopleObject");
            var query = new Parse.Query(PeopleObject);
                if(params !== undefined) {
                    if(params.lastname !== undefined) {
                        query.equalTo("lastname", params.lastname);
                    }
                    if(params.firstname !== undefined) {
                        query.equalTo("firstname", params.lastname);
                    }
                }
        query.find({
            success: function(results) {
                console.log("Successfully retrieved " + results.length + " people!");
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    console.log(object.id + ' - ' + object.get("firstname") + " " + object.get("lastname"));
                }
            },
            error: function(error) {
                console.log("Error: " + error.code + " " + error.message);
            }
        });
        }
           
    }
})*/

.factory('DataFactory', function($q){

var DataFactory = Parse.Object.extend(Parse.BusinessCategory, {

}, {
    //Class methods

    getCategories:function(params) {
            var BusinessCategory = Parse.Object.extend("BusinessCategory");
            var query = new Parse.Query(BusinessCategory);
                if(params !== undefined) {
                    if(params.id !== undefined) {
                        query.equalTo("objectId", params.id);//get category by ID
                    }
                    if(params.name !== undefined) {
                        query.equalTo("name", params.name);//get category by name
                    }
                }
            query.find({
                success: function(results) {
                    return results;
                    console.log("Successfully retrieved " + results.length + " categories!");
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        console.log(object.id + ' - ' + object.get("name"));
                    }
                },
                error: function(error) {
                    return {};
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        }


}

    return{
        /*savePerson:function(firstname, lastname) {
           var PeopleObject = Parse.Object.extend("PeopleObject");
            var person = new PeopleObject();
            person.set("firstname", firstname);
            person.set("lastname", lastname);
            person.save(null, {});
        } */

        

        getBusinesses:function(params) {
            var Business = Parse.Object.extend("Business");
            var query = new Parse.Query(Business);
                if(params !== undefined) {
                    if(params.id !== undefined) {
                        query.equalTo("objectId", params.id);//get category by ID
                    }
                    if(params.name !== undefined) {
                        query.equalTo("name", params.name);//get category by name
                    }
                    if(params.categoryId !== undefined) {
                        var category = {"__type":"Pointer","className":"BusinessCategory","objectId":params.categoryId}
                        query.equalTo("category", category);//get category by name
                    }
                }
        query.find({
            success: function(results) {
                console.log("Successfully retrieved " + results.length + " businesses!");
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    console.log(object.id + ' - ' + object.get("name"));
                }
            },
            error: function(error) {
                console.log("Error: " + error.code + " " + error.message);
            }
        });
        }
           
    }
})

//.factory('Business', businesses)

//.factory('Category', categories)

.factory ('StorageService', function ($localStorage) {

$localStorage = $localStorage.$default({
  things: []
});

var _getAll = function () {
  return $localStorage.things;
};
var _add = function (thing) {
  $localStorage.things.push(thing);
}
var _remove = function (thing) {
  $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
}
return {
    getAll: _getAll,
    add: _add,
    remove: _remove
  };
})
/*.factory('DataStore', function(){
    //created empty datastore
    var DataStore = {
        categories: {},
        businesses: {},
        categoryRefObjects: {},
        reviews: {},
        user: {}
    };

    DataStore.setCategories = function(data){
        DataStore.categories = data;
    };

    DataStore.setBusinesses = function(data){
        DataStore.businesses = data;
    };

    DataStore.setReviews = function(data){
        DataStore.reviews = data;
    };

    return DataStore;

    /*DataStore.setCategory = function(businesses){
        var l = businesses.length;
        var category; 
        var lookup = {};
        for(i= 0; i < l; i++){
            lookup[]
            category = businesses[i].category;
            DataStore.RefcategoryObjects.push(category)

            result = $.grep(DataStore.RefcategoryObjects, function(e){ return e.objectId == ; })
        }
    }

    DataStore.addCategory = function(category){
        DataStore.categoryBusinesses.push(category);
    };

    DataStore.
})*/;
