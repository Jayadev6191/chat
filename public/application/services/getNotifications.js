chatapp.factory('getNotifications',['$http','$q','userService',function($http,$q,userService){
		var notifications={};
		notifications.notify=[];
		
		notifications.getNewNotifications=function(){
			var deferred = $q.defer();
					
			$http.get('/api/notifications').success(function(data, error) {
				notifications.notifs = Object.keys(data.notifications);
				// console.log(notifications.notifs);
				for (var i = 0; i < notifications.notifs.length; i++) {
					// console.log(notifications.notify.indexOf(notifications.notifs[i]) > -1);
					if ($.inArray(notifications.notifs[i], notifications.notify) > -1) {
						console.log('already active..no need to notify');
					} else {
						// console.log($scope.selectedUser);
						if (userService.getCurrentUser().id !== notifications.notifs[i]) {
							notifications.notify.push(notifications.notifs[i]);
							console.log(notifications.notify);
							deferred.resolve(notifications.notify);
						}
					}
				}
				// console.log($scope.notify);
			}).error(function(reason, status, headers, config) {
				deferred.reject(reason);
			});

			return deferred.promise;
		};
	return notifications;
}]);