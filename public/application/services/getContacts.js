chatapp.factory('getContacts',['$http','$q','userService',function($http,$q,userService){
		var contacts={};
		
		contacts.getEachContact=function(contact_id,index){
			var deferred = $q.defer();
			$http.get('/api/contacts/'+contact_id).success(function(data, status, headers, config){
				if(index==0){
					userService.setCurrentUser(data);
				}
				deferred.resolve(data);
			}).error(function(reason, status, headers, config) {
				deferred.reject(reason);
			});
			return deferred.promise;
		};
	return contacts;
}]);