var app = angular.module('caffeinehit.controllers', []);

app.controller("YelpController", function ($scope, YelpService) {
	$scope.yelp = YelpService;
	$scope.doRefresh = function (){
if(!$scope.yelp.isLoading){
$scope.yelp.refresh().then(function (){
$scope.$broadcast('scroll.refreshComplete');

});

}

	};

	$scope.getDirection= function(cafe) {
        console.log('getting directions');

        var destination = [
            cafe.location.coordinate.longitude,
            cafe.location.coordinate.longitude

        ];
        var source = [
            $scope.yelp.lon,
            $scope.yelp.lat
        ];

        launchnavigator.navigate(destination, source);
    };


	$scope.loadMore = function(){
        console.log("loading more");

        if($scope.yelp.isLoading && $scope.yelp.hasMore){

            $scope.yelp.next().then(function(){
                $scope.$broadcast('scroll.infiniteScrollComplete');

            });
        }
    };




		$scope.openMap = function(cafe) {

            console.log("loading the map");
        }


});
