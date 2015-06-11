chatapp.controller('HomeCtrl',['$scope','$http','$q',function($scope,$http,$q){
	$scope.contacts=[];
	$scope.notify=[];
	
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
		console.log($scope.notify.indexOf($(this)[0].contact.id));
		// $scope.notify.splice($(this)[0].contact.id,$scope.notify.indexOf($(this)[0].contact.id));
		// console.log($scope.notify);
		
		// GET /api/contacts/{id}/messages
		
		$http.get('/api/contacts/'+$(this)[0].contact.id+'/messages').success(function(data, error) {
			console.log(data);
			$scope.history="";
			$scope.history=data.messages;
		}).error(function() {

		}); 	
	};
	
	setInterval(function(){
		$http.get('/api/notifications').success(function(data, error) {
			$scope.notifs=Object.keys(data.notifications);
			for(var i=0;i<$scope.notifs.length;i++){
				console.log($scope.notify.indexOf($scope.notifs[i])>-1);
				if($.inArray($scope.notifs[i], $scope.notify) > -1){
					console.log('already there');
				}else{
					$scope.notify.push($scope.notifs[i]);
				}
			}
			console.log($scope.notify);
		}).error(function(data,error){
			console.log(error);
		});
	},5000);
	
}]);