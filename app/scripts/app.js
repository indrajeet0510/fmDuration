'use strict';

/**
 * @ngdoc overview
 * @name fmDurationExampleApp
 * @description
 * # fmDurationExampleApp Example module to see the usage of fmDuration.
 *
 * Example module to see the usage of fmDuration.
 */
angular
  .module('fmDurationExample', ['fmDuration']).controller('MainCtrl',['$scope',function($scope) {
    $scope.cfg = {
      name: "Duration",
      required: true
    };
    $scope.editMode = true;
    $scope.value = "1 hr 45 min";
    $scope.draft = {
      hrs: 10,
      min: 56
    };

    $scope.toggleEditMode = function () {
      $scope.editMode = !$scope.editMode;
    };
  }]
);
