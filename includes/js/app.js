var mindMap = angular.module('mindMap',['ngMaterial','ui.router']);

// ---------------- ^^^ Config ^^^ --------------------------
mindMap.config(function($stateProvider,$urlRouterProvider){
  $stateProvider
    .state('defaultPage',{
      url: '',
      templateUrl:'includes/views/defaultSearchPage.html'
    })
    .state('searchResults',{
      templateUrl:'includes/views/searchResults.html'
    })
    .state('graphDisplay',{
      templateUrl:'includes/views/graph.html'
    })
});

// ---------------- ^^^ Directives ^^^ --------------------------
mindMap.directive('searchResultCard',function(){
  return {
    templateUrl : "includes/views/searchResultCard.html",
    controller : "searchResultCard"
  }
});

mindMap.directive('mainDir',function(){
  return {
    templateUrl : "includes/views/mainDir.html",
    controller : "mainCtrl"
  }
});

mindMap.directive('inDepthFilters',function(){
  return {
    templateUrl : "includes/views/inDepthFilters.html",
    controller : "graphCtrl"
  }
});

mindMap.directive('queryDisplay',function(){
  return {
    templateUrl : "includes/views/queryDisplay.html",
    controller : "queryDisplayCtrl"
  }
});


mindMap.directive('filterResultCard',function(){
  return {
    templateUrl : "includes/views/filterResultCard.html",
    controller : "filterResultCard"
  }
});

mindMap.directive('filterAdd',function(){
  return {
    templateUrl : "includes/views/filterAdd.html",
    controller : "addFilter"
  }
});

// ---------------- ^^^ Main Ctrl ^^^ --------------------------
mindMap.controller('mainCtrl',['$scope','$rootScope','$http',function($scope,$rootScope,$http){

  // ---------------- ^^^ Getting Search Results ^^^ --------------------------
  $http({
    method: 'GET',
    url: 'http://localhost:630/profiles'
  }).then(function successCallback(response) {
      $rootScope.profilesParent = response.data;
      $rootScope.profiles = $scope.profilesParent;
      }, function errorCallback(response) {
  });

}]);
