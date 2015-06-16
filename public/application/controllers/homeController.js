chatapp.controller('HomeCtrl',['$scope','$http','$q','getContacts','messages','getNotifications','userService',function($scope,$http,$q,getContacts,messages,getNotifications,userService){
	$scope.contacts=[];
	$scope.notify=[];
	$scope.selectedUser=userService.getCurrentUser();
	$scope.query="";
	$http.get('/api/contacts').success(function(data,error){
		for(var i=0;i<data.contacts.length;i++){
			if(i==0){
				$scope.getCurrentMessages(data.contacts[0]);
				$scope.selected=i;
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
	
	$scope.currentUser=function(index){
		$scope.selected=index;
		userService.setCurrentUser($(this)[0].contact);
		var current_user_id=userService.getCurrentUser().id;
		$scope.selectedUser=userService.getCurrentUser();
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