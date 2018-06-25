var app = angular.module('caffeinehit.services', []);

app.service("YelpService", function ($q, $http, $cordovaGeolocation, $ionicPopup) {
	var self = {
		'page': 1,
		'isLoading': false,
		'hasMore': true,
		'results': [],
		'lat': 51.544440,
		'lon': -0.022974,
		'refresh': function () {
			self.page = 1;
			self.isLoading = false;
			self.hasMore = true;
			self.results = [];
			return self.load();
		},
		'next': function () {
			self.page += 1;
			return self.load();
		},
		'load': function () {
			self.isLoading = true;
			var deferred = $q.defer();
     ionic.Platform.ready( function(){
		$cordovaGeolocation.getCurrentPosition({timeout:10000, enableHighAccuracy:false}).then( function(position){
		self.lat = position.coords.latitude;
		self.lon = position.coords.longitude;
		var params = {
			latitude: 51.5002,
			longitude: -0.022974
		};

	$http.get('http://127.0.0.1:5000/api/v1/businesses', {params: params})
		.success(function (data) {
			self.isLoading = false;
			console.log(data);

			if (data.businesses.length == 0) {
				self.hasMore = false;
			} else {
				angular.forEach(data.businesses, function (business) {
					self.results.push(business);
				});
			}

			deferred.resolve();
		})
		.error(function (data, status, headers, config) {
			self.isLoading = false;
			deferred.reject(data);
		});



}, function(err){

	console.error("Error getting position");
	console.error(err);
	$ionicPopup.alert({
		'title':'Switch on Geolocation',
		'template': 'It seems the Geolocation feature of your phone is off or There are no yelp results for you at the moment'

	});
		 })




	 });
			return deferred.promise;
		}
	};

	self.load();

	return self;
});