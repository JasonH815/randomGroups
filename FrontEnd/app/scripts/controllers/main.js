'use strict';

/**
 * @ngdoc function
 * @name randomGroupsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the randomGroupsApp
 */
angular.module('randomGroupsApp')
  .controller('MainCtrl',['$scope', function ($scope) {

    var tableMap = {};
    $scope.students = [];

    var originalStudent = {
      name: '',
      table: null
    };

    $scope.newStudent = angular.copy(originalStudent);


    var addStudent = function(){
      $scope.students.push($scope.newStudent);
      tableMap[$scope.newStudent.table] = $scope.newStudent;
      $scope.newStudent = angular.copy(originalStudent);
      $scope.studentForm.$setUntouched();

    };

    $scope.removeStudent = function(student){
      //remove required errors for now
      $scope.studentForm.$setPristine();
      $scope.studentForm.$setUntouched();
      $scope.studentForm.table.$error.required = false;
      $scope.studentForm.name.$error.required = false;

      var idx = $scope.students.indexOf(student);
      tableMap[student.table] = undefined;
      $scope.students.splice(idx, 1);

      //check if we cleared the table error
      if (!tableMap[$scope.newStudent.table]){
        $scope.studentForm.table.$error.existsError = false;
      }

    };

    $scope.keyPressed = function(event) {
      //check if table is used
      if(tableMap[$scope.studentForm.table.$modelValue]){
        $scope.studentForm.table.$error.existsError = true;
        return;
      } else {
        $scope.studentForm.table.$error.existsError = false;
      }

      //check if any input is missing
      if ($scope.studentForm.name.$error.required || $scope.studentForm.table.$error.required) {
        return;
      }

      //add student if enter key is pressed
      if (event.keyCode === 13) {
        addStudent();
      }
    };

  }]);
