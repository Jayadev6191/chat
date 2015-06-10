var chatapp=angular.module('chatapp',['ngRoute']);

//routes
chatapp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'application/partials/home.html',
        controller: 'HomeCtrl'
      });
});