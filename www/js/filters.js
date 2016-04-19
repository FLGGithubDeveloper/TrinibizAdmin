angular.module('trinibiz.filters', [])

.filter('timeDifference', [function() {
    return function(datetime) {
        return new Date()-datetime;
    };
}])
.filter('capitalize', function() {
  return function(token) {
      return token.charAt(0).toUpperCase() + token.slice(1);
   }
});
