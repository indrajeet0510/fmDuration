/**
 * @ngdoc overview
 * @name fmDuration
 * @author Indra Jeet
 * @description
 * # fmDurationExampleApp Example module to see the usage of fmDuration.
 *
 * Example module to see the usage of fmDuration.
 */
(function(){
  angular.module('fmDuration',[])

    .value('tplFmDurationInput',function(){
      return '<label>{{cfg.name}}</label>&nbsp;' +
        ' <div class="fmDuration" ng-class="(cfg.required && editMode) ? \'fmDurationRequired\' : \'\'">' +
        '<input class="inputHrs" name="fmInputHrs" tabindex="1" ng-model="draft.hrs" ' +
        'ng-keydown="alterHour($event)" ng-class="(editMode) ? \'\' : \'hidden\'" type="text" placeholder="00"/>' +
        '<span ng-class="(editMode) ? \'\' : \'hidden\'">:</span>' +
        '<input name="fmInputMin" class="inputMin" tabindex="2" ng-model="draft.min"  ' +
        'ng-keydown="alterMinute($event)" ng-class="(editMode) ? \'\' : \'hidden\'" type="text" placeholder="00"/>' +
        '<span class="inputMin" ng-class="(editMode) ? \'hidden\' :\'\'" ng-bind-html="value"></span>' +
        '</div><sup class="fmDurationRequired">{{(cfg.required) ? \'*\' : \'\'}}</sup>';
    })

    .directive('fmDurationInput',['tplFmDurationInput',function(tplFmDurationInput){
      return {
        template : tplFmDurationInput,
        restrict : "E",
        scope : {
          editMode : '=',
          draft : '=',
          value : '=',
          path : '@',
          cfg : '='
        },
        require: 'ngModel',
        controller : function($scope,$sce){
          var defaultCfg = {
            name : 'Duration',
            required : false
          };

          var defaultDraft = {
            hrs : '00',
            min : '00'
          };
          if(typeof $scope.cfg == 'object'){
            if(!$scope.cfg.name){
              $scope.cfg.name = defaultCfg.name;
            }
            if(!$scope.cfg.hasOwnProperty('required')){
              $scope.cfg.required = defaultCfg.required;
            }
          }
          else{
            $scope.cfg = defaultCfg;
          }

          if(typeof $scope.draft == 'object'){
            if(!$scope.draft.hasOwnProperty('hrs')){
              $scope.draft.hrs = defaultDraft.hrs;
            }
            if(!$scope.draft.hasOwnProperty('min')){
              $scope.draft.min = defaultDraft.min;
            }
          }
          else{
            $scope.draft = defaultDraft;
          }

          var twoDigits = function(num){

            num = parseInt(num,10);
            if(num && (!isNaN(num))){
              num = (num.toString().length < 2) ? '0'+num.toString() : num.toString();
            }
            else{
              num = '00';
            }
            return num;
          };

          $scope.value = $sce.trustAsHtml($scope.value);

          $scope.alterMinute = function(evt){
            if(evt.which == 38){
              $scope.draft.min = twoDigits((parseInt($scope.draft.min) > 0) ? parseInt($scope.draft.min) - 1 : parseInt($scope.draft.min));
            }
            else if(evt.which == 40){
              $scope.draft.min = twoDigits( (parseInt($scope.draft.min) < 59) ? parseInt($scope.draft.min)+1 : parseInt($scope.draft.min) );
            }

            else if((evt.which >95 && evt.which < 105) ||
              (evt.which > 47 && evt.which < 58) ||
              (evt.which > 36 && evt.which < 40) ||
              (evt.which == 8 || evt.which == 9 ||evt.which == 32 || evt.which == 46)){

              if(evt.shiftKey && (evt.which !== 9)){
                evt.preventDefault();
                return;
              }

              //Numpad 96-105
              //Backspace 8
              //37 Arrow left
              //39 Arrow-right
              //46 Delete
              //32 space
              //Numbers 48 57
              // Tab 9

            }
            else{
              evt.preventDefault();
            }


          };

          $scope.alterHour = function(evt){
            if(evt.which == 38){
              $scope.draft.hrs = twoDigits((parseInt($scope.draft.hrs) > 0) ? parseInt($scope.draft.hrs) - 1 : parseInt($scope.draft.hrs));
            }
            else if(evt.which == 40){
              $scope.draft.hrs = twoDigits( (parseInt($scope.draft.hrs) < 23) ? parseInt($scope.draft.hrs)+1 : parseInt($scope.draft.hrs) );
            }
            else if((evt.which >95 && evt.which < 105) ||
              (evt.which > 47 && evt.which < 58) ||
              (evt.which > 36 && evt.which < 40) ||
              (evt.which == 8 || evt.which == 9 ||evt.which == 32 || evt.which == 46)){

              if(evt.shiftKey){
                evt.preventDefault();
                return;
              }
              //Numpad 96-105
              //Backspace 8
              //37 Arrow left
              //39 Arrow-right
              //46 Delete
              //32 space
              //Numbers 48 57
              //Tab 9

            }
            else{
              evt.preventDefault();
            }

          };

          $scope.$watch('draft.hrs',function(n){
            if(n){
              var x = parseInt(n);
              if(x > 23 && (!isNaN(x))){
                $scope.draft.hrs = twoDigits(x/10);
              }
              else{
                $scope.draft.hrs = (isNaN(x)) ? twoDigits(0) : twoDigits(x);
              }
            }
          });

          $scope.$watch('draft.min',function(n){
            if(n){
              var x = parseInt(n);
              if(x > 59 && (!isNaN(x))){
                $scope.draft.min = twoDigits(x/10);
              }
              else{
                $scope.draft.min = (isNaN(x)) ? twoDigits(0) : twoDigits(x);
              }
            }
          });

        }

      };
    }]);
})();
