chatapp.controller('HomeCtrl',['$scope','$http','$q','getContacts','getMessages','getNotifications','userService',function($scope,$http,$q,getContacts,getMessages,getNotifications,userService){
	$scope.contacts=[];
	
	$http.get('/api/contacts').success(function(data,error){
		for(var i=0;i<data.contacts.length;i++){
			if(i==0){
				getCurrentMessages(data.contacts[0]);
			}		
			getContacts.getEachContact(data.contacts[i],i).then(function(data) {
				$scope.contacts.push(data.contact);
				userService.setCurrentUser($scope.contacts[0]);
			}); 
		}

	}).error(function(data,error){
		console.log(error);
	});
	
	
	
	function getCurrentMessages(user_id){
		getMessages.getContactMessages(user_id).then(function(data) {
			$scope.history = "";
			$scope.history = data.messages;
		}); 
	}
	
	$scope.currentUser=function(){
		userService.setCurrentUser($(this)[0].contact);
		var current_user_id=userService.getCurrentUser().id;
		
		//check if current id exists in the array
		if($scope.notify.indexOf(current_user_id)>-1){
			$scope.notify.splice($scope.notify.indexOf(current_user_id),1);
		}

		// GET /api/contacts/{id}/messages
		getCurrentMessages(current_user_id);
		return current_user_id;
	};
	
	setInterval(function(){
		getCurrentMessages(userService.getCurrentUser().id);
		
		getNotifications.getNewNotifications().then(function(data){
			console.log(data);
			$scope.notify=data;
		});
	},5000);
}]);