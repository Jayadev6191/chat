chatapp.factory('messages',['$http','$q',function($http,$q){
		var messages={};
		
		messages.getContactMessages=function(contact_id){
			var deferred = $q.defer();
			$http.get('/api/contacts/'+contact_id+'/messages').success(function(data, status, headers, config) {
				deferred.resolve(data);
			}).error(function(reason, status, headers, config) {
				deferred.reject(reason);
			});
			
			return deferred.promise;
		};
		
		messages.postContactMessages=function(contact_id,message){
			$http.post('/api/contacts/'+contact_id+'/messages',message).success(function(data, status, headers, config) {
				console.log(data);
			}).error(function(reason, status, headers, config) {
				console.log(reason);
			});
		};
		
	return messages;
}]);