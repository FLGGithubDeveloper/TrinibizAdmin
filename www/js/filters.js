angular.module('trinibiz.filters', [])

.filter('timeDifference', [function() {
    return function(datetime) {
        return new Date()-datetime;
    };
}])
