var visitorCenter = angular.module('VisitorCenter', ['ngResource']);

visitorCenter.factory("Visitor", function($resource) {
  return $resource("visitors/:id", { id: '@id' }, {
    index:   { method: 'GET', isArray: true, responseType: 'json' },
    update:  { method: 'PUT', responseType: 'json' }
  });
})

visitorCenter.controller("visitorsController", function($scope, Visitor) {
  $scope.visitors = Visitor.index()
  alert("sdfasdfsadf");
  $scope.addVisitor = function() { var errors, success, newVisitor;
      alert("eeee");

    newVisitor = $scope.newVisitor;
    $scope.errors = {}; 
    success = function (result){
    $scope.visitors.push(result)
    $scope.newVisitor = {}
    }
    errors = function(result){
      angular.forEach(result.data.errors, function(errors, field) {
        $scope.yourForm[field].$setValidity('server', false);
        $scope.errors[field] = errors.join(', ');
      });
    }
  }

  // $scope.addVisitor = function() {
  //   alert("dsfsdafsdf");
  //   // vissitor = Visitor.save($scope.newVisitor)
  //   console.log(visitor.);
  //   $scope.visitors.push(visitor)
  //   $scope.newVisitor = {}
  // }

  $scope.deleteVisitor = function(index) {
    
    visitor = $scope.visitors[index]
    Visitor.delete(visitor)
    $scope.visitors.splice(index, 1);
  }
})