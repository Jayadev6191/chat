chatapp.factory('getNotifications',['$http','$q','userService',function($http,$q,userService){
		var notifications={};
		notifications.notify=[];
		
		notifications.getNewNotifications=function(){
			var deferred = $q.defer();
					
			$http.get('/api/notifications').success(function(data, error) {
				notifications.notifs = Object.keys(data.notifications);
				for (var i = 0; i < notifications.notifs.length; i++) {
					if ($.inArray(notifications.notifs[i], notifications.notify) > -1) {
						// console.log('already active..no need to notify');
					} else {
						if (userService.getCurrentUser().id !== notifications.notifs[i]) {
							notifications.notify.push(notifications.notifs[i]);
							deferred.resolve(notifications.notify);
						}
					}
				}
			}).error(function(reason, status, headers, config) {
				deferred.reject(reason);
			});

			return deferred.promise;
		};
	return notifications;
}]);