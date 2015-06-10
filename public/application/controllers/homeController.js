chatapp.controller('HomeCtrl',['$scope','$http','$q',function($scope,$http,$q){
	$scope.contacts=[];
	
	$http.get('/api/contacts').success(function(data,error){
		for(var i=0;i<data.contacts.length;i++){
			$http.get('/api/contacts/'+data.contacts[i]).success(function(data){
				$scope.selectedUser=$scope.contacts[0];
				$scope.contacts.push(data.contact);
				console.log($scope.contacts);
			});
		}
	}).error(function(data,error){
		console.log(error);
	});
	
	$scope.currentUser=function(){
		$scope.selectedUser=$(this)[0].contact;
		
		// GET /api/contacts/{id}/messages
		
		$http.get('/api/contacts/'+$(this)[0].contact.id+'/messages').success(function(data, error) {
			console.log(data);
			$scope.history="";
			$scope.history=data.messages;
		}).error(function() {

		}); 

		
	};
}]);