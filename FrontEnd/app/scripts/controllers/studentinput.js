'use strict';

/**
 * @ngdoc function
 * @name randomGroupsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the randomGroupsApp
 */
angular.module('randomGroupsApp')
  .controller('StudentInputCtrl', ['$scope', function ($scope) {

    var tableMap = {};
    $scope.students = [];

    var originalStudent = {
      name: '',
      table: null
    };

    $scope.newStudent = angular.copy(originalStudent);

    $scope.clearValidation = function () {
      $scope.studentForm.name.$setUntouched();
      $scope.studentForm.table.$setUntouched();

      // check if we cleared the table error
      if (!tableMap[$scope.newStudent.table]) {
        $scope.studentForm.table.$setValidity('existsError', true);
      }
    };

    var addStudent = function () {
      $scope.students.push($scope.newStudent);
      tableMap[$scope.newStudent.table] = $scope.newStudent;
      $scope.newStudent = angular.copy(originalStudent);

      $scope.clearValidation();
    };

    $scope.removeStudent = function (student) {
      var idx = $scope.students.indexOf(student);
      tableMap[student.table] = undefined;
      $scope.students.splice(idx, 1);

      $scope.clearValidation();
    };

    $scope.keyPressed = function (event) {
      console.log($scope.studentForm.table.$error);

      //check if table is used
      if (tableMap[$scope.studentForm.table.$modelValue]) {
        $scope.studentForm.table.$setValidity('existsError', false);
        return;
      } else {
        $scope.studentForm.table.$setValidity('existsError', true);
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

  }])


  .directive('studentInput', ['$document', function ($document) {

    return {
      templateUrl: 'views/student-input.html',
      link: function ($scope, $elm, $attr) {
        $document.on('click', docClick);

        function docClick(evt) {
          //console.log($(evt.target));

          // if clicking add student, don't set touched state
          if ($(evt.target).closest('button#addStudentButton').length !== 0) {
            return;
          }

          if ($(evt.target).closest('input#nameInput').length !== 0) {
            $scope.studentForm.name.$touched = true;
          } else if ($(evt.target).closest('input#tableInput').length !== 0) {
            $scope.studentForm.table.$touched = true;
          }
          //TODO clicking outside will hide form errors
        }
      }
    };

  }]);
