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