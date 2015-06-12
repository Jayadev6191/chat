var chatapp=angular.module('chatapp',['ngRoute']);

//routes
chatapp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'application/partials/home.html',
        controller: 'HomeCtrl'
      });
});
chatapp.controller('HomeCtrl',['$scope','$http','$q','getContacts','messages','getNotifications','userService',function($scope,$http,$q,getContacts,messages,getNotifications,userService){
	$scope.contacts=[];
	$scope.notify=[];
	$scope.selectedUser=userService.getCurrentUser();
	$scope.query="";
	
	$http.get('/api/contacts').success(function(data,error){
		for(var i=0;i<data.contacts.length;i++){
			if(i==0){
				$scope.getCurrentMessages(data.contacts[0]);
			}		
			getContacts.getEachContact(data.contacts[i],i).then(function(data) {
				$scope.contacts.push(data.contact);
				userService.setCurrentUser($scope.contacts[0]);
				$scope.selectedUser=userService.getCurrentUser();
			}); 
		}

	}).error(function(data,error){
		console.log(error);
	});
	
	$scope.getCurrentMessages=function(user_id){
		messages.getContactMessages(user_id).then(function(data) {
			$scope.history = "";
			$scope.history = data.messages;
		}); 
	};
	
	$scope.sendMessage=function(msg){
		var new_message={
			content:msg
		};
		var message=JSON.stringify(new_message);
		
		messages.postContactMessages($scope.selectedUser.id,message);
		$('#message').val('');
	};
	
	$scope.currentUser=function(){
		userService.setCurrentUser($(this)[0].contact);
		$scope.selectedUser=userService.getCurrentUser();
		var current_user_id=userService.getCurrentUser().id;
		
		//check if current id exists in the array
		if($scope.notify.indexOf(current_user_id)>-1){
			$scope.notify.splice($scope.notify.indexOf(current_user_id),1);
		}

		// GET /api/contacts/{id}/messages
		$scope.getCurrentMessages(current_user_id);
		return current_user_id;
	};
	
	setInterval(function(){
		$scope.getCurrentMessages(userService.getCurrentUser().id);
		
		getNotifications.getNewNotifications().then(function(data){
			$scope.notify=data;
		});
	},5000);
	
	
	$(document).on("click", "#clear_search", function(e) {
		e.stopImmediatePropagation();
		$('#search').val('');
	}); 
}]);
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
chatapp.factory('userService',['$http','$q',function($http,$q){
	var user={};
		user.current_user="";
		user.getCurrentUser=function(){
			return user.current_user;
		};
		
		user.setCurrentUser=function(current_user){
			user.current_user=current_user;
		};
	return user;
}]);