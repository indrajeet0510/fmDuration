'use strict';

/**
 * @ngdoc function
 * @name timeControlApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the timeControlApp
 */
angular.module('fmDurationExample').controller('MainCtrl',function($scope,$sce,$timeout){
  $scope.cfg = {
    name : "Duration",
    required : true
  };
  $scope.editMode = true;
  $scope.value = "1hr 45min";
  $scope.draft = {
    hrs : 1,
    min : 45
  };


  $scope.toggleEditMode = function(){
    $scope.editMode = !$scope.editMode;
  };

  $scope.$watch('editMode',function(n){
    if(!n){
      $timeout(function(){
        $scope.value = $sce.trustAsHtml($scope.draft.hrs + 'hrs'+ ' '+ $scope.draft.min + 'min');
      },100);

    }
  });
});

